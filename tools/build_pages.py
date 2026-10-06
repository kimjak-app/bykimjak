"""Stage static Pages files and the SHA-256-pinned full trailer outside Git.

Phase 1: --dry-run checks the budget without downloading or publishing anything.
Phase 2: publish the release, record its sha256/status in config/media-assets.json,
then run this script from the Pages Actions build. GitHub Pages settings remain
unchanged until phase 2.
"""
import argparse
import hashlib
import json
from pathlib import Path
import shutil
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
LIMIT = 950 * 1024 * 1024  # headroom below GitHub's 1 GB published-site limit
EXCLUDED = {'.git', '.github', 'tools', 'config', 'docs', 'tasks', '_site'}

def sources():
    for path in ROOT.rglob('*'):
        rel = path.relative_to(ROOT)
        if not path.is_file() or any(part.startswith('.') or part in EXCLUDED for part in rel.parts):
            continue
        if str(rel) in {'CLAUDE.md', 'blog-structure.md', 'byKimjak-standalone.html'}:
            continue
        yield path, rel

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--dry-run', action='store_true')
    parser.add_argument('--trailer-bytes', type=int)
    args = parser.parse_args()
    manifest = json.loads((ROOT / 'config/media-assets.json').read_text(encoding='utf-8'))
    trailer = manifest['gappaeTrailer03']
    files = list(sources())
    local = ROOT / trailer['publishPath']
    existing = sum(p.stat().st_size for p, _ in files)
    trailer_bytes = args.trailer_bytes if args.trailer_bytes is not None else trailer.get('bytes', 250 * 1024 * 1024)
    estimated = existing + (0 if local.exists() else trailer_bytes)
    if estimated > LIMIT:
        raise SystemExit(f'Pages budget exceeded: {estimated:,} > {LIMIT:,} bytes. Use a video CDN or reduce static assets before deployment.')
    if args.dry_run:
        print(f'Budget OK: static {existing:,}; estimated with trailer {estimated:,}; cap {LIMIT:,} bytes')
        return
    if trailer['status'] != 'ready' or not trailer['sha256'] or len(trailer['sha256']) != 64:
        raise SystemExit('Final trailer is not approved/hashed in media-assets.json; no deployment staged.')
    site = ROOT / '_site'
    if site.exists():
        raise SystemExit('_site already exists. Use a fresh checkout for an unambiguous artifact.')
    site.mkdir()
    for source, rel in files:
        target = site / rel
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, target)
    target = site / trailer['publishPath']
    target.parent.mkdir(parents=True, exist_ok=True)
    if not local.exists():
        urllib.request.urlretrieve(trailer['releaseUrl'], target)
    with target.open('rb') as video:
        digest = hashlib.file_digest(video, 'sha256').hexdigest()
    if digest != trailer['sha256']:
        raise SystemExit('Trailer SHA-256 mismatch; refuse to publish.')
    with target.open('rb') as video:
        if video.read(12)[4:8] != b'ftyp':
            raise SystemExit('Expected an MP4 container; refuse to publish.')
    size = sum(p.stat().st_size for p in site.rglob('*') if p.is_file())
    if size > LIMIT:
        raise SystemExit(f'Actual artifact over budget: {size:,} > {LIMIT:,} bytes')
    (site / '.nojekyll').touch()
    print(f'Staged Pages artifact: {size:,} bytes')

if __name__ == '__main__':
    main()

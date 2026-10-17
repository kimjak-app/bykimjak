"""Build lightweight Pages using verified public-media URLs.

Original tracked assets are preserved but excluded from the default artifact.
Use --legacy-media only for a budget-checked rollback to the earlier layout.
"""
import argparse
import hashlib
import json
from pathlib import Path
import shutil
import urllib.request
import subprocess
from public_media import PublicMedia, TEXT_EXTENSIONS

ROOT = Path(__file__).resolve().parents[1]
LIMIT = 950 * 1024 * 1024  # headroom below GitHub's 1 GB published-site limit
EXCLUDED = {'.git', '.github', 'tools', 'config', 'docs', 'tasks', '_site'}

def sources(media=None):
    tracked = subprocess.check_output(['git', 'ls-files', '-z'], cwd=ROOT).decode('utf-8').split('\0')
    for name in tracked:
        if not name:
            continue
        rel = Path(name)
        path = ROOT / rel
        if not path.is_file() or any(part.startswith('.') or part in EXCLUDED for part in rel.parts):
            continue
        # Baegopa video/OST are served from the approved public release.
        if rel.as_posix().startswith(('assets/baegopa/video/', 'assets/baegopa/ost/')):
            continue
        if str(rel) in {'CLAUDE.md', 'blog-structure.md', 'byKimjak-standalone.html'}:
            continue
        if media and rel.as_posix() in media.paths:
            continue
        yield path, rel

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--dry-run', action='store_true')
    parser.add_argument('--trailer-bytes', type=int)
    parser.add_argument('--legacy-media', action='store_true', help='Restore the pre-migration media layout without deleting any source assets.')
    parser.add_argument('--output', type=Path, default=ROOT / '_site')
    args = parser.parse_args()
    manifest = json.loads((ROOT / 'config/media-assets.json').read_text(encoding='utf-8'))
    trailer = manifest['gappaeTrailer03']
    media = None if args.legacy_media else PublicMedia(ROOT)
    files = list(sources(media))
    local = ROOT / trailer['publishPath']
    existing = sum(p.stat().st_size for p, _ in files)
    trailer_bytes = args.trailer_bytes if args.trailer_bytes is not None else trailer.get('bytes', 250 * 1024 * 1024)
    estimated = existing + (0 if media or local.exists() else trailer_bytes)
    limit = 70 * 1024 * 1024 if media else LIMIT
    if estimated > limit:
        raise SystemExit(f'Pages budget exceeded: {estimated:,} > {limit:,} bytes.')
    if args.dry_run:
        print(f'Budget OK: static {existing:,}; estimated {estimated:,}; cap {limit:,} bytes')
        return
    if trailer['status'] != 'ready' or not trailer['sha256'] or len(trailer['sha256']) != 64:
        raise SystemExit('Final trailer is not approved/hashed in media-assets.json; no deployment staged.')
    site = args.output.resolve()
    if site.exists():
        raise SystemExit('_site already exists. Use a fresh checkout for an unambiguous artifact.')
    site.mkdir(parents=True)
    for source, rel in files:
        target = site / rel
        target.parent.mkdir(parents=True, exist_ok=True)
        if media and source.suffix in TEXT_EXTENSIONS:
            target.write_text(media.rewrite(source.read_text(encoding='utf-8'), source.suffix), encoding='utf-8', newline='\n')
        else:
            shutil.copy2(source, target)
    if media:
        size = sum(p.stat().st_size for p in site.rglob('*') if p.is_file())
        if size > limit:
            raise SystemExit(f'Actual artifact over budget: {size:,} > {limit:,}')
        (site / '.nojekyll').touch()
        print(f'Staged release-media Pages artifact: {size:,} bytes ({size / 1024**2:.2f} MiB)')
        return
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

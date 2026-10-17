"""Verify public Release URLs without credentials, including byte-range seeking."""
from pathlib import Path
import argparse
from concurrent.futures import ThreadPoolExecutor, as_completed
import json
import time
import urllib.request

ROOT = Path(__file__).resolve().parents[1]

def check(asset):
    for attempt in range(3):
        try:
            req = urllib.request.Request(asset['url'], headers={'User-Agent': 'bykimjak-media-verification', 'Range': 'bytes=0-31'})
            with urllib.request.urlopen(req, timeout=60) as response:
                status = response.status
                content_range = response.headers.get('Content-Range', '')
                length = response.headers.get('Content-Length')
                mime = response.headers.get('Content-Type', '').split(';')[0]
                head = response.read(32)
                if status == 206:
                    assert content_range == 'bytes 0-31/' + str(asset['bytes']), content_range
                else:
                    assert status == 200 and int(length) == asset['bytes'], (status, length)
                if asset.get('mime', '').startswith(('video/', 'audio/')):
                    assert status == 206, 'Media seeking requires a range response'
                assert len(head) == min(32, asset['bytes'])
                expected = asset.get('mime')
                if expected:
                    assert mime in (expected, 'application/octet-stream'), (expected, mime)
                return {'url': asset['url'], 'status': status, 'contentRange': content_range, 'contentType': mime}
        except Exception:
            if attempt == 2:
                raise
            time.sleep(2)

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--report', type=Path, required=True)
    parser.add_argument('--unverified-only', action='store_true', help='Check newly added assets after a completed full verification.')
    args = parser.parse_args()
    path = ROOT / 'config/public-media.json'
    manifest = json.loads(path.read_text(encoding='utf-8'))
    jobs = []
    for asset in manifest['assets']:
        if args.unverified_only and asset.get('verified'):
            continue
        jobs.append(asset)
        if asset.get('thumbnail'):
            jobs.append({**asset['thumbnail'], 'mime': 'image/webp'})
    results = []
    failures = []
    with ThreadPoolExecutor(max_workers=3) as pool:
        futures = {pool.submit(check, a): a for a in jobs}
        for f in as_completed(futures):
            try:
                results.append(f.result())
            except Exception as exc:
                failures.append({'url': futures[f]['url'], 'error': str(exc)})
                if len(failures) <= 3: print('Failure:', type(exc).__name__, str(exc), flush=True)
            if (len(results) + len(failures)) % 50 == 0:
                print('Verified', len(results), 'failed', len(failures), 'of', len(jobs), flush=True)
    args.report.parent.mkdir(parents=True, exist_ok=True)
    args.report.write_text(json.dumps({'checked': len(jobs), 'results': results, 'failures': failures}, ensure_ascii=False, indent=2), encoding='utf-8')
    if failures:
        raise SystemExit(str(len(failures)) + ' public URLs failed; manifest not enabled')
    for a in manifest['assets']:
        a['verified'] = True
    manifest['status'] = 'verified'
    path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print('All public URLs verified:', len(jobs))

if __name__ == '__main__':
    main()

"""Build-time asset URL resolution. Source pages retain portable local paths."""
import html
import hashlib
import json
from pathlib import Path
import re
from urllib.parse import quote

TEXT_EXTENSIONS = {'.html', '.css', '.js', '.json', '.md'}

class PublicMedia:
    def __init__(self, root):
        self.root = Path(root)
        self.manifest = json.loads((self.root / 'config/public-media.json').read_text(encoding='utf-8'))
        if self.manifest.get('status') != 'verified':
            raise ValueError('Public media must be verified before building the release preview.')
        self.assets = self.manifest['assets']
        self.paths = {a['path'] for a in self.assets}
        self.aliases = {}
        for a in self.assets:
            if not a.get('verified') or not a['url'].startswith('https://'):
                raise ValueError('Unverified media: ' + a['path'])
            p = a['path']
            for encoded in {p, quote(p), quote(p, safe='/')}:
                for prefix in ('', './', '../', '../../', '/', '/bykimjak/', 'https://kimjak-app.github.io/bykimjak/'):
                    self.aliases[prefix + encoded] = a['url']
            for old in a.get('aliases', []):
                self.aliases[old] = a['url']
        self.pattern = re.compile(r'(?<![\w/])(?:' + '|'.join(re.escape(k) for k in sorted(self.aliases, key=len, reverse=True)) + r')(?=[\s\x27\x22<>?#),]|$)')
        self.images = {a['url']: a for a in self.assets if a.get('thumbnail')}

    def rewrite(self, text, suffix):
        text = self.pattern.sub(lambda m: self.aliases[m.group()], text)
        if suffix != '.html':
            return text
        # Refresh cached players/viewers together with the rewritten media markup.
        for script in ('assets/js/trailer-player.js', 'assets/js/baegopa-watch-lightbox.js', 'make/lightbox.js'):
            source = self.root / script
            if source.exists():
                version = hashlib.sha256(source.read_bytes()).hexdigest()[:12]
                name = re.escape(script.rsplit('/', 1)[-1])
                text = re.sub(r'(<script\b[^>]*\bsrc=[\x27\x22][^\x27\x22?]*' + name + r')(?=[\x27\x22])', lambda m: m.group(1) + '?v=' + version, text)
        def image(match):
            tag = match.group()
            src = re.search(r'(?<![\w-])src=([\x27\x22])(.*?)\1', tag, re.S)
            if not src:
                return tag
            a = self.images.get(html.unescape(src.group(2)))
            if not a:
                return tag
            original = html.escape(a['url'], quote=True)
            thumb = html.escape(a['thumbnail']['url'], quote=True)
            replacement = 'src="' + thumb + '" data-original-src="' + original + '"'
            return tag[:src.start()] + replacement + tag[src.end():]
        return re.sub(r'<img\b[^>]*>', image, text, flags=re.I)

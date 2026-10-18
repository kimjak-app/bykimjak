"""Discover published MAKE articles; keep curated historical entries unchanged."""
import json
import re
import subprocess
from html.parser import HTMLParser


class Article(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = ''
        self.description = ''
        self.in_title = False
        self.article = False
        self.private = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'title':
            self.in_title = True
        if 'devlog__body' in attrs.get('class', '').split():
            self.article = True
        if tag == 'meta':
            if attrs.get('name') == 'description':
                self.description = attrs.get('content', '')
            if attrs.get('name') == 'robots' and 'noindex' in attrs.get('content', ''):
                self.private = True

    def handle_endtag(self, tag):
        if tag == 'title':
            self.in_title = False

    def handle_data(self, data):
        if self.in_title:
            self.title += data


def discover(root, text):
    known = set(re.findall(r"url:\s*['\"]([^'\"]+)", text))
    paths = subprocess.check_output(['git', 'ls-files', 'make/*.html'], cwd=root, text=True).splitlines()
    rows = []
    for path in paths:
        if path in known or path.endswith('-en.html') or path.startswith(('make/eastwar', 'make/grandslam', 'make/takezero')):
            continue
        doc = Article()
        doc.feed((root / path).read_text(encoding='utf-8'))
        if not doc.article or doc.private:
            continue
        # Publication is the first addition, not the most recent typo/style edit.
        dates = subprocess.check_output(['git', 'log', '--diff-filter=A', '--format=%aI', '--', path], cwd=root, text=True).splitlines()
        if not dates:
            raise ValueError('Commit the new MAKE article before building: ' + path)
        published = dates[-1]
        title = re.split(r'\s*[·—]\s*MAKE|\s*[·—]\s*byKimjak', doc.title, maxsplit=1, flags=re.I)[0].strip()
        order = re.search(r'-(\d+)\.html$', path)
        rows.append(dict(url=path, catKey='film-making', cat='Film Making', title=title, sequence=int(order[1]) if order else 1,
                         sub=doc.description, date=published[:10], publishedAt=published,
                         dl=published[:10].replace('-', ' · ')))
    return rows


def augment_posts(root, text):
    marker = '// STUDIO_GENERATED_POSTS'
    if marker not in text:
        raise ValueError('Missing studio feed insertion marker')
    return text.replace(marker, 'window.ALL_POSTS.push.apply(window.ALL_POSTS, ' +
                        json.dumps(discover(root, text), ensure_ascii=False) + ');')

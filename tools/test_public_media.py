"""Regression cases for nested pages, original-image viewers and legacy aliases."""
import json
from pathlib import Path
import tempfile
import unittest
from public_media import PublicMedia

class MediaRewriteTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(dir=Path(__file__).resolve().parent, prefix=".test-media-")
        root = Path(self.temp.name)
        (root / 'config').mkdir()
        self.url = 'https://github.com/example/site/releases/download/media/picture.png'
        self.thumb = 'https://github.com/example/site/releases/download/media/thumb.webp'
        data = {'status': 'verified', 'assets': [{'path': 'assets/baegopa/food/test image.png', 'verified': True, 'url': self.url, 'thumbnail': {'url': self.thumb}, 'aliases': ['https://old.example/image.png']}]}
        (root / 'config/public-media.json').write_text(json.dumps(data), encoding='utf-8')
        self.media = PublicMedia(root)

    def tearDown(self):
        self.temp.cleanup()

    def test_nested_thumbnail_and_original_link(self):
        result = self.media.rewrite('<a href="../../assets/baegopa/food/test image.png"><img src="../../assets/baegopa/food/test image.png" alt="test"></a>', '.html')
        self.assertIn('href="' + self.url + '"', result)
        self.assertIn('src="' + self.thumb + '"', result)
        self.assertIn('data-original-src="' + self.url + '"', result)

    def test_encoded_and_absolute_paths(self):
        for path in ('/bykimjak/assets/baegopa/food/test%20image.png', 'https://kimjak-app.github.io/bykimjak/assets/baegopa/food/test%20image.png'):
            self.assertEqual(self.media.rewrite('"'+path+'"', '.js'), '"'+self.url+'"')

    def test_alias_and_query(self):
        self.assertEqual(self.media.rewrite('"https://old.example/image.png?v=1"', '.js'), '"'+self.url+'?v=1"')

    def test_unrelated_asset_and_existing_remote_unchanged(self):
        s='<img src="../assets/ui/logo.png"><img src="https://other.example/assets/baegopa/food/test image.png">'
        self.assertEqual(self.media.rewrite(s, '.html'), s)

    def test_css_preserves_original(self):
        self.assertEqual(self.media.rewrite('url(../assets/baegopa/food/test image.png)', '.css'), 'url('+self.url+')')

if __name__ == '__main__':
    unittest.main()

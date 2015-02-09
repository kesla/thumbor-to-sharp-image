var test = require('tape');
var objectToImage = require('./');
var Sharp = require('sharp');
var parse = require('thumbor-url').parse;
var toImage = function(url) {
  return objectToImage(parse(url + 'http://example.com/image.jpg'));
};

test('no options', function(t) {
  t.throws(function() {
    objectToImage();
  });
  t.end();
});

test('empty string', function(t) {
  t.ok(toImage(''));
  t.ok(toImage('') instanceof Sharp);

  t.end();
});

test('crop/extract', function(t) {
  var parsed = parse('/10x20:110x220/http://example.com/image.jpg');
  // this is a real use case
  parsed.crop.method = 'faces';
  var image = objectToImage(parsed);

  t.equal(image.options.leftOffsetPre, 10);
  t.equal(image.options.topOffsetPre, 20);
  t.equal(image.options.widthPre, 100);
  t.equal(image.options.heightPre, 200);
  t.end();
});

test('trim', function(t) {
  t.throws(function() {
    toImage('/trim/');
  });
  t.end();
});

test('width & height', function(t) {
  var image = toImage('/10x20/');

  t.equal(image.options.width, 10);
  t.equal(image.options.height, 20);
  t.end();
});

test('filters not supported', function(t) {
  var filters = [
    'brightness',
    'contrast',
    'colorize',
    'equalize',
    'fill',
    'format',
    'grayscale',
    'max_bytes',
    'noise',
    'no_upscale',
    'rgb',
    'round_corner',
    'rotate',
    'saturation',
    'sharpen',
    'strip_icc',
    'watermark',
    'convolution',
    'blur',
    'extract_focal',
    'gifv'
  ];

  filters.forEach(function(filter) {
    t.throws(function() {
      toImage('/filters:' + filter + '()/');
    });
  });
  t.end();
});

test('supported filters', function(t) {
  t.equal(toImage('/filters:quality(30)/').options.quality, 30);
  t.end();
});

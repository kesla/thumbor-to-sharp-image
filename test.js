var test = require('tape');
var objectToImage = require('./');
var Sharp = require('sharp');
var parseDecrypted = require('thumbor-url').parseDecrypted;
var toImage = function(url) {
  return objectToImage(parseDecrypted(url + 'http://example.com/image.jpg'));
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
  var image = toImage('/10x20:110x220/');

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

var Sharp = require('sharp');
var assert = require('assert');

module.exports = function(options) {
  assert(options, 'options object is required');

  var image = Sharp();

  if (options && isNumbers(options.crop)) {
    image = image.extract(
      options.crop.top,
      options.crop.left,
      (options.crop.right - options.crop.left),
      (options.crop.bottom - options.crop.top)
    );
  }

  return image;
};

function isNumbers(object) {
  return Object.keys(object).every(function(key) {
    return typeof object[key] === 'number';
  });
}
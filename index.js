var Sharp = require('sharp');
var assert = require('assert');
var supportedFilters = [];

module.exports = function(options) {
  assert(options, 'options object is required');
  assert(!options.trim.orientation, 'trim is not supported');
  (options.filters || []).forEach(function(filter) {
    assert(supportedFilters.indexOf(filter.name) !== -1, filter.name + ' is not a supported filter');
  });

  var image = Sharp();

  if (isNumbers(options.crop)) {
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
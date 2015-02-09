var Sharp = require('sharp');
var assert = require('assert');
var filterMethods = {
  quality: function(image, args) {
    image.quality.call(image, parseInt(args[0], 10));
  }
};

module.exports = function(options) {
  assert(options, 'options object is required');
  assert(!options.trim.orientation, 'trim is not supported');
  var filters = options.filters || [];

  filters.forEach(function(filter) {
    assert(filterMethods[filter.name], filter.name + ' is not a supported filter');
  });

  var image = Sharp();

  filters.forEach(function(filter) {
    filterMethods[filter.name](image, filter.args);
  });

  if (areNumbers(options.crop, ['top', 'left', 'right', 'bottom'])) {
    image = image.extract(
      options.crop.top,
      options.crop.left,
      (options.crop.right - options.crop.left),
      (options.crop.bottom - options.crop.top)
    );
  }

  if (typeof options.width === 'number' && typeof options.height === 'number') {
    image = image.resize(options.width, options.height);
  }
  
  return image;
};

function areNumbers(object, keys) {
  return keys.every(function(key) {
    return typeof object[key] === 'number';
  });
}
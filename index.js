var Sharp = require('sharp');
var assert = require('assert');

module.exports = function(object) {
  var image = Sharp();

  if (object && isNumbers(object.crop)) {
    image = image.extract(
      object.crop.top,
      object.crop.left,
      (object.crop.right - object.crop.left),
      (object.crop.bottom - object.crop.top)
    );
  }

  return image;
};

function isNumbers(object) {
  return Object.keys(object).every(function(key) {
    return typeof object[key] === 'number';
  });
}
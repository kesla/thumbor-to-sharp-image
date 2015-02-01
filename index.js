var parseDecrypted = require('thumbor-url').parseDecrypted;
var Sharp = require('sharp');

module.exports = function(url) {
  var image = Sharp();
  var object = parseDecrypted(url);

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
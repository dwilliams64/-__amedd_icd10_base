// ARRAY PAGE REMOVAL
function cleanArray(actual) {
  var newArray = new Array();
  for (var i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}

module.exports = function(arr) {
  var output = cleanArray(arr.map(function(val) {
    if(val.indexOf(".html") > -1) {
      return null;
    } else {
      return val;
    }
  }));

  return output;

}

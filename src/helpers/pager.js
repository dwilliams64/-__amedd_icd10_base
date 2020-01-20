module.exports = function(array, value, options) {
  var type = options.hash.type || 'middle';
  var ret = '';
  var pageCount;
  // var page = array.indexOf(value);
  var page;
  var arr;
  var parr;
  var pageArray = [];
  var pathArray = [];
  var limit;
  if (options.hash.limit) limit = +options.hash.limit;
// console.log("array "+array)
  if (array.length > 0) {
    for (var j = 0; j < array.length; j++) {
      pageArray.push(array[j].base);
    }
  }
// console.log("pageArray "+pageArray+" array length "+array.length)

  if (array.length > 0) {
    for (var k = 0; k < array.length; k++) {
      var tempPath = array[k].path;
      if (tempPath.indexOf('resources/')){
        pathArray.push(array[k].path);
      }
    }
  }
// console.log("pathArray "+pathArray+" pathArray length "+pathArray.length)

  page = pageArray.indexOf(value);
  pageCount = pathArray.length;
  arr = pageArray;
  parr = pathArray;
// console.log("page "+page+" pageCount "+pageCount+" arr "+arr+" parr "+parr)

  // //page pageCount
  var newContext = {};
  switch (type) {
    case 'middle':
      if (typeof limit === 'number') {
        var i = 0;
        var leftCount = Math.ceil(limit / 2) - 1;
        var rightCount = limit - leftCount - 1;
        if (page + rightCount > pageCount)
          leftCount = limit - (pageCount - page) - 1;
        if (page - leftCount < 1)
          leftCount = page - 1;
        var start = page - leftCount;

        while (i < limit && i < pageCount - 1) {
          newContext = { n: parr[start - 1] };
          if (start === page) newContext.active = true;
          ret = ret + options.fn(newContext);
          start++;
          i++;
        }
      } else {
        for (var i = 1; i <= pageCount - 1; i++) {
          newContext = { n: parr[i] + '-' + (i + 1) };
          if (i === page) newContext.active = true;
          ret = ret + options.fn(newContext);
        }
      }
      break;

    case 'previous':
      if (page === 0) {
        newContext = { disabled: true, n: parr[page] }
      } else {
        newContext = { n: parr[page - 1] }
      }
      ret = ret + options.fn(newContext);
      break;

    case 'next':
      newContext = {};
      if (page === pageCount - 2) {
        newContext = { disabled: true, n: parr[page] }
      } else {
      newContext = { n: parr[page + 1] }
      }
      ret = ret + options.fn(newContext);
      break;

    case 'first':
      if (page === 0) {
        newContext = { disabled: true, n: 0 }
      } else {
        newContext = { n: parr[0] }
      }
      ret = ret + options.fn(newContext);
      break;

    case 'last':
      if (page === pageCount - 2) {
        newContext = { disabled: true, n: parr[pageCount - 2] }
      } else {
        newContext = { n: parr[pageCount - 2] }
      }
      ret = ret + options.fn(newContext);
      break;

    case 'progress':
      newContext = { n: (page + 1) + ' of ' + (pageCount - 1) }
      ret = ret + options.fn(newContext);
      break;

    case 'percent':
      var a = (page + 1) / (pageCount - 1);
      var b = a * 100;
      if (page === 0){
        newContext = { n: 0 + '%' }
      } else {
        newContext = { n: Math.ceil(b) + '%' }
      }
      ret = ret + options.fn(newContext);
      break;
  }

  return ret;

};

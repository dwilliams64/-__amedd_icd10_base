module.exports = function (listOfObjects, property, options) {
    var unique = {};
    var distinctList = [];

    for (var objectIndex in listOfObjects) {
        var object = listOfObjects[objectIndex];

        if (typeof (unique[object[property]]) == "undefined") {
            distinctList.push(object[property]);
        }

        unique[object[property]] = 0;
    }

    return options.fn(distinctList);
}

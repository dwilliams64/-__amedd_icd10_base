module.exports = function (collection, property, value, options) {
    var subset = [];

    for (var teamIndex in collection) {
        var team = collection[teamIndex];

        if (team[property] !== undefined && team[property] === value) {
            subset.push(team);
        }
    }

    return options.fn(subset);
}

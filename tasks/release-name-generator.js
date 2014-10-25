'use strict';

var _ = require('lodash');
_.mixin(require('underscore.string'));
var util = require('util');

module.exports = function(grunt) {

    var adjectives = require(__dirname + '/../lib/adjectives.json');

    var animals = {
        'birds': grunt.file.readJSON(__dirname + '/../lib/animals/birds.json'),
        'fish': grunt.file.readJSON(__dirname + '/../lib/animals/fish.json'),
        'lizards': grunt.file.readJSON(__dirname + '/../lib/animals/lizards.json'),
        'reptiles': grunt.file.readJSON(__dirname + '/../lib/animals/reptiles.json'),
        'mammals': grunt.file.readJSON(__dirname + '/../lib/animals/mammals.json')
    };

    var format = function(data) {
        data = _.map(data, function(row) {
            return _.capitalize(row.toLowerCase());
        });
        return data;
    };

    adjectives = format(adjectives);
    _.each(animals, function(data, key) {
        animals[key] = format(data);
    });

    var generateName = function(category) {
        adjectives = _.shuffle(adjectives);
        var adjective = adjectives[0];
        var filteredAnimals = _.filter(animals[category], function(animal) {
            if (animal[0] === adjective[0]) {
                return true;
            }
        });
        if (!filteredAnimals.length) {
            return generateName(category);
        }
        filteredAnimals = _.shuffle(filteredAnimals);
        return adjective + ' ' + filteredAnimals[0];
    };

    grunt.registerMultiTask('release-name-generator', function() {

        var options = this.options();
        var categories = _.keys(animals);

        if (!options.category) {
            options.category = _.shuffle(categories)[0];
        } else if (!animals[options.category]) {
            grunt.fail.fatal('Invalid category specified: ' + options.category);
        }

        grunt.log.subhead('Generating release name for: ' + this.target);

        var name = generateName(options.category);

        grunt.log.oklns('Release name: ' + name);

        if (!global.release_name) {
            global.release_name = {};
        }
        global.release_name[this.target] = name;

    });

};

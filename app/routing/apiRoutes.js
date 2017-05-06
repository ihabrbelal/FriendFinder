// DEPENDENCIES
var path = require('path');
var friendsData = require('../data/friends.js');


// ROUTING

module.exports = function(app) {

    app.get('/api/friends', function(req, res) {

        res.json(friendsData);
    });

    app.post('/api/friends', function(req, res) {

        var scoresArray = [];

        //Loop through each friend in friendsData...
        for (var i = 0; i < friendsData.length; i++) {

            var individualArray = [];

            for (var j = 0; j < friendsData[0].scores.length; j++) {

                var diff = Math.abs(req.body.scores[j] - friendsData[i].scores[j]);
                individualArray.push(diff);
            }

            var totes = individualArray.reduce((a, b) => a + b, 0);

            //push the compatibility score for each potential match into scoresArray         
            scoresArray.push(totes);
        }
        //find the smallest number in the array, which indicates the most compatible match for our newFriend
        function arrayMin(array) {
            return array.reduce(function(a, b) {
                return Math.min(a, b);
            });
        }

        function getAllIndexes(arr, val) {
            var indexes = [],
                i = -1;
            while ((i = arr.indexOf(val, i + 1)) != -1) {
                indexes.push(i);
            }
            return indexes;
        }

        var smallestDiff = arrayMin(scoresArray);
        var indexesForMatches = getAllIndexes(scoresArray, smallestDiff);
        var matchesArray = [];


        for (var i = 0; i < indexesForMatches.length; i++) {
            matchesArray.push(friendsData[indexesForMatches[i]]);
        }
        res.json(matchesArray);

        friendsData.push(req.body);

    });

    app.post('/api/clear', function(req, res) {
        friendsData = [];


        console.log(friendsData);
    })

}

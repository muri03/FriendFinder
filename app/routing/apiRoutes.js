// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on friends.js.
// ===============================================================================

var friends = require("../data/friends");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });



    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the friends array)
    // ---------------------------------------------------------------------------

    app.post("/api/friends", function(req, res) {
   
        var newFriend = req.body;
        friends.push(newFriend);
        myScore = newFriend.scores;
        // Declare variables needed
        var diffs = [];
        var smallNum = 0;   
        var smallIndex = 0;
  
        // for each instance
        for (i = 0; i < (friends.length - 1); i++) {
            // placeholder for sum of all differences
            var differences = 0;
            // for each score in each set
            for (j = 0; j < friends[i].scores.length; j++) {
                // find the difference between user score and friends score
                differences += (Math.abs(parseInt(myScore[j]) - friends[i].scores[j]));
            }
            // push total differences to array diffs
            diffs.push(differences);
            // finding smallest difference
            // if differences value is less than smallest number or it is the first value in array
            if (differences < smallNum || i === 0) {
                // set smallNum to differences
                smallNum = differences;
                // set smallIndex to current index
                smallIndex = i;
            }
        };
        // return friend of calculated smallest index 
        res.json(friends[smallIndex]);
    })
}
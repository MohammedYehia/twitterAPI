const express = require('express');
const router = express.Router();
const Twit = require('twit');
const twitConfig = require('./connections/twitConfig');
const Twitter = new Twit(twitConfig);

// router.get('/tweets/:word', function (req, res, next) {
//     Twitter.get('search/tweets', {
//                 q: req.params.word,
//                 count: 2
//             }, function (err, tweets, response) {
//         if(err) console.log(err)
//         res.json(tweets)
//     })
// });

router.get('/usertweets/:user', function (req, res, next) {
    Twitter.get('statuses/user_timeline', {
                screen_name: req.params.user,
                count: 50,
                // trim_user:1,
                include_entities:false
            }, function (err, tweets, response) {
        if(err) console.log(err)
        res.json(tweets)
    })
});

module.exports = router;

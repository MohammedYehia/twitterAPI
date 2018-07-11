const router = require('express').Router();
const Twit = require('twit');
const twitConfig = require('./connections/twitConfig');
const Twitter = new Twit(twitConfig);

// router.get('/tweets/:word', function (req, res, next) {
//     Twitter.get('search/tweets', {
//                 q: req.params.word,
//                 count: 2,
//             }, function (err, tweets, response) {
//         if(err) console.log(err)
//         res.json(tweets)
//     })
// });

router.get('/usertweets/:user', function (req, res, next) {
    Twitter.get('statuses/user_timeline', {
                screen_name: req.params.user,
                //count: 30,
                tweet_mode:'extended',
                include_entities:false,
                // include_rts:false,
                // exclude_replies:true,
            }, function (err, tweets, response) {
                if(err) console.log(err)
                const filteredTweets = tweets.map(tweet => {
                    return {
                        created_at: tweet.created_at,
                        text: tweet.full_text,
                        profile_banner_url: tweet.user.profile_banner_url,
                        profile_image_url: tweet.user.profile_image_url
                    }
                });
            res.json(filteredTweets)
    })
});




module.exports = router;

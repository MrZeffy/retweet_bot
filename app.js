const Twitter = require('twit');
const config = require('./config/congif.js');




var T = new Twitter(config);


// Fethcing our Own user ID.

const getBotId = async ()=>{
    const result = await T.get('account/verify_credentials');
    let botId = result['data']['id_str'];
    return botId;
};

getBotId().then((ourBotId)=>{
    let queries = ['#javascript', '#100DaysOfCode'];
    console.log(ourBotId);
    
});




function likeATweet(tweet, botId){

    console.log("before liking", botId);

    T.post('/2/users/:id/likes', { 'id': botId, 'tweet_id': tweet['id_str'] })
        .catch((err) => {
            console.log("Oh damn, here we go again");
            console.log(err);
        });
}


function searchingForTweets(T, queries, botId){

    return new Promise((resolve, reject)=>{
        T.get('search/tweets', {
            q: queries[1],
            result_type: 'recent',
            count: 1,
            lang: 'en'
        }).then(async (result) => {

            const resultTweets = result['data'].statuses;
           
           resolve(resultTweets);

        }).catch((err) => {
            console.log('OOPS This went a bit rough.');
            reject(err);
        });
    })
}


function postAStatus(T, status){
    T.post('statuses/update', {
        status: status
    }).then((result) => {
        console.log(result['data']);
        console.log('Tweeted Successfully');
    }).catch((err) => {
        console.log('OOPS an error occurred');
        console.log(err.stack);
    })
}


function retweetATweet(T, tweet){
    T.post('statuses/retweet/:id', { id: tweet['id_str'] })
    .catch((err) => {
        console.log('Something horrible happened');
        console.log(err);
        process.exit(1);
    });
}


function searchAndRetweet(T, queries, ourBotId){
    searchingForTweets(T, queries, ourBotId).then((resultTweets) => {
        for (tweet of resultTweets) {

            retweetATweet(T, tweet);
        }
    })
}
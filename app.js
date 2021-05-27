const Twitter = require('twit');
const config = require('./config/congif.js');




var T = new Twitter(config);


let botId = null;

const getBotId = async ()=>{
    console.log("Let's find our own id");
    const result = await T.get('account/verify_credentials');
    console.log("My id is");
    console.log(result['data']['id_str']);
    botId = result['data']['id_str'];
};

// T.post('statuses/update', { status: 'hello world! 👩‍💻' }, function (err, data, response) {
//     console.log(data);
//     console.log('Tweet has been tweeted');
// })




// T.get('search/tweets', { q: '#nodejs backend', count: 10 }, function (err, data, response) {
//     console.log(data)
// });


queries = ['#javascript', '#100DaysOfCode']

T.get('search/tweets', {
    q: queries[1],
    result_type: 'recent',
    count: 2,
    lang: 'en'
}).then(async (result)=>{
    
    const resultTweets = result['data'].statuses;

    for(tweet of resultTweets){

        // T.post('statuses/retweet/:id', {id: tweet['id_str']})
        // .catch((err)=>{
        //     console.log('Something horrible happened');
        //     console.log(err);
        //     process.exit(1);
        // })

        if(botId === null){
            getBotId().then(()=>{
                likeATweet(tweet);
            })
        }else{
            likeATweet(tweet);
        }


        

        
    }

    
}).catch((err)=>{
    console.log('OOPS This went a bit rough.');
    console.log(err);
});




// T.post('statuses/update', {
//     status: 'Hello World :) ☕\n I am a bot created'+
//      'by @trickybhai. Follow me for amazing tweets about JavaScript.'
// }).then((result) => {
//     console.log(result['data']);
//     console.log('Tweeted Successfully');
// }).catch((err)=>{
//     console.log('OOPS an error occurred');
//     console.log(err.stack);
// })

function likeATweet(tweet){

    console.log("before liking", botId);

    T.post('/2/users/:id/likes', { 'id': botId, 'tweet_id': tweet['id_str'] })
        .catch((err) => {
            console.log("Oh damn, here we go again");
            console.log(err);
        });
}
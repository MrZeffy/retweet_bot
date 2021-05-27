const Twitter = require('twit');
const env = require('dotenv');


// Configuring environment variables.
env.config();


var T = new Twitter({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

// T.post('statuses/update', { status: 'hello world! 👩‍💻' }, function (err, data, response) {
//     console.log(data);
//     console.log('Tweet has been tweeted');
// })

// T.get('search/tweets', { q: '#nodejs backend', count: 10 }, function (err, data, response) {
//     console.log(data)
// });

T.post('statuses/update', {
    status: 'Hello World :) ☕\n I am a bot created'+
     'by @trickybhai. Follow me for amazing tweets about JavaScript.'
}).then((result) => {
    console.log(result['data']);
    console.log('Tweeted Successfully');
}).catch((err)=>{
    console.log('OOPS an error occurred');
    console.log(err.stack);
})


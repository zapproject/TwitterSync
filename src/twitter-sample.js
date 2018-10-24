const Twit = require('twit');

let T = new Twit({
    consumer_key: 'i6vOiwm6p9LRZBTDEBWgQeXWt',
    consumer_secret: 'LJabON19g6w9fCmS89MUdQBRM42unOiOvRsdzDbXyCegAguQlf',
    access_token: '213310185-hEofb03StXpnLDSTnnmc96Gr1YsiaN8YiJDGXF5a',
    access_token_secret: 'eq7JPnXqbZFF9f5vyRUfeyQ9h5kzPEgzuUigMxlkfCo7h'
});

var twitter_stream;

T.get('account/verify_credentials', {
    include_entities: false,
    skip_status: true,
    include_email: false
}, (err, res) => {
    if (err) {
        console.log(err);
        reject(err);
    } else {
        twitter_stream = T.stream('statuses/filter', { follow: [213310185] });

        twitter_stream.on('tweet', function (tweet) {
            console.log('New tweet')
        });

        twitter_stream.on('*', function (tweet) {
            console.log('New tweet')
        });
    }
});




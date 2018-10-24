const Config = require("./config.js");
const TwitterDB = require("./db/db-connection.js");
const AccountsDao = require("./db/dao/accounts-dao.js");
const TwitterClient = require("./bot/twitter-client.js");
const CommandProcessor = require("./bot/command-processor.js");
const ZapsyncTwitterHandler = require("./bot/zap-handlers/zapsync-handler.js");
const ZaptransferTwitterHandler = require("./bot/zap-handlers/zaptransfer-handler.js");


var db = new TwitterDB({host: Config.db_host, user: Config.db_user, password: Config.db_password, database: Config.db_name});
db.connect().then(() => {
    let accounts_dao = new AccountsDao(db);

    // SETUP CLIENT FOR TWITTER
    let twitter_client = new TwitterClient({
        consumer_key: Config.twitter_consumer_key,
        consumer_secret: Config.twitter_consumer_secret,
        access_token: Config.twitter_access_token,
        access_token_secret: Config.twitter_access_secret
    });

    // my user id 213310185
    twitter_client.fetchFilterStream({ track: 'zapbot' }).then((stream) => {
        const twitter_processor = new CommandProcessor([new ZapsyncTwitterHandler(accounts_dao), new ZaptransferTwitterHandler()]);

        stream.on('tweet', function (tweet) {
            console.log('Received new tweet.');
            twitter_processor.process(tweet);
        });

        stream.on('delete', function (msg) {
            console.log('Deleted.' + JSON.stringify(msg));
        });

        stream.on('unknown_user_event', function (msg) {
            console.log('unknown_user_event.' + JSON.stringify(msg));
        });

        stream.on('message', function (msg) {
            console.log('message.' + JSON.stringify(msg));
        });

        stream.on('error', function (err) {
            console.log('error.' + err);
        });

        stream.on('parser-error', function (err) {
            console.log('parser-error.' + err);
        });

        stream.on('disconnect', function (err) {
            console.log('Disconnected.');
        });

        console.log('Listening for tweets.');
    });
});
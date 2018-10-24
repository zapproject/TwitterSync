const Twit = require('twit');

class TwitterClient {

    /**
     * Create new instance of TwitterClient
     * Using 'twit' library for Twitter API requests
     *
     * @param consumer_key - can be found there https://developer.twitter.com/en/apps
     * @param consumer_secret - can be found there https://developer.twitter.com/en/apps
     * @param access_token - can be found there https://developer.twitter.com/en/apps
     * @param access_token_secret - can be found there https://developer.twitter.com/en/apps
     */
    constructor({consumer_key, consumer_secret, access_token, access_token_secret}) {
        this._T = new Twit({
            consumer_key,
            consumer_secret,
            access_token,
            access_token_secret
        });
    }

    /**
     * Function check user auth and creates stream for 'statuses/filter' endpoint
     *
     * @param params
     * @returns {Promise<StreamingAPIConnection>} - available params: https://developer.twitter.com/en/docs/tweets/filter-realtime/guides/basic-stream-parameters
     */
    async fetchFilterStream(params) {
        let self = this;

        // check auth
        await new Promise((resolve, reject) => {
            self._T.get('account/verify_credentials', {
                include_entities: false,
                skip_status: true,
                include_email: false
            }, (err, res) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(res);
                }
            })
        });

        // check connection
        await new Promise((resolve, reject) => {
            self._T.get('statuses/home_timeline', function (err, reply) {
                if (err) {
                    console.log('err', err);
                    reject(err);
                } else {
                    resolve(reply);
                }
            });

        });

        //create stream
        return await this._T.stream('statuses/filter', params);
    }

    get twitter() {
        return this._T;
    }
}

module.exports = TwitterClient;
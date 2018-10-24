const CommandHandler = require('../command-handler.js');
const Param = require('../param.js');

class ZapsyncTwitterHandler extends CommandHandler {
    constructor(accounts_dao) {
        super({
            command_name: 'zapsync',
            params: [
                new Param({position: 0, type: 'text'}),
                new Param({position: 1, type: 'text'})
            ]
        });
        this._accounts_dao = accounts_dao;
    }

    validateParams(provided_params) {
        if (!(provided_params instanceof Array)) {
            throw new Error('Params not array.');
        }

        for (let i in this.params) {
            if (!this.params[i].validate(provided_params[this.params[i].position])) {
                throw new Error('Parameter \'' + provided_params[this.params[i].position] + '\' not valid.');
            }
        }
    }

    async handle(params, json) {
        this.validateParams(params);

        this._accounts_dao.insert({twitter_id: json.user.id, twitter_name: json.user.screen_name, eth_address: params[1]});
        console.log('Processed command \'' + this.command + '\'. Params: ' + params.toString());
    }
}

module.exports = ZapsyncTwitterHandler;
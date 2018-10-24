const CommandHandler = require('../command-handler.js');
const Param = require('../param.js');

class ZaptransferTwitterHandler extends CommandHandler {
    constructor() {
        super({
            command_name: 'transfer',
            params: [
                new Param({position: 0, type: 'text'}),
                new Param({position: 1, type: 'number'})
            ]
        });
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

        // TODO: Implement transfer
        console.log('Command \'transfer\' not implemented.');

        console.log('Processed command \'' + this.command + '\'. Params: ' + params.toString());
    }
}

module.exports = ZaptransferTwitterHandler;
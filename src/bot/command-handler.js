const Param = require('./param.js');

class CommandHandler {
    constructor({command_name, params}) {
        this._command = command_name;
        this._params = params;
    }

    isTwitterHandler() {
        return true;
    }

    async handle(params, json) { }

    get command() {
        return this._command;
    }

    get params() {
        return this._params;
    }
}

module.exports = CommandHandler;
class CommandProcessor {
    constructor(handlers) {
        if (!CommandProcessor.validateHandlers(handlers)) {
            throw new Error('Property \'handlers\' must be an TwitterHandlers array.');
        }

        this._handlers = handlers;
    }

    static validateHandlers(handlers) {
        if (!(handlers instanceof Array)) {
            throw new Error('Property \'handlers\' must be an array.');
        }

        for (let i in handlers) {
            if (!handlers[i].isTwitterHandler()) {
                return false;
            }
        }

        return true;
    }

    static applyCommand(index, words_array, handler, json) {
        let params_amount = handler.params.length;
        let params = [];
        index = parseInt(index);
        for (let i = index + 1; i < words_array.length; i++) {
            if (i === index + params_amount + 1) {
                break;
            }

            params.push(words_array[i]);
        }

        if (params.length < params_amount) {
            console.log('Command \'' + handler.command + '\' doesn\'t have enough params');
        } else {
            handler.handle(params, json);
        }
    }

    findCommand(word) {
        console.log('Process word: ' + word);
        for (let i in this._handlers) {
           if (word === this._handlers[i].command) {
               return this._handlers[i];
           }
        }
    }

    async process(twitter_json) {
        let text = twitter_json.text;
        let words_array = text.split(' ');

        for (let i = 0; i < words_array.length; i++) {
            let handler = this.findCommand(words_array[i]);
            if (handler) {
                console.log('Processing \'' + handler.command + '\' command.');
                CommandProcessor.applyCommand(i, words_array, handler, twitter_json);

                // skip current command params
                i += handler.params.length;
            }
        }

    }
}

module.exports = CommandProcessor;
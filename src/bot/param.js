class CommandParam {
    constructor({position, type}) {
        this._position = position;
        this._type = type;
    }

    validate(value) {
        switch (this.type) {
            case 'number': {
                return !isNaN(value);
            }
            case 'text': {
                if (value) {
                    return true;
                } else {
                    return false;
                }
            }

            default: break;
        }
    }

    get position() {
        return this._position;
    }

    get type() {
        return this._type;
    }
}

module.exports = CommandParam;
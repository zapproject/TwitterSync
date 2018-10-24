var mysql = require("mysql");

class TwitterDB {
    constructor({host, user, password, database}) {
        this._connection_params = {
            host,
            user,
            password,
            database
        };

        this._connection = mysql.createConnection(this._connection_params);
    }

    async connect() {
        return await this._connection.connect();
    }

    async query(sql, values) {
        return await new Promise((resolve, reject) => {
            this._connection.query(sql, values, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        })
    }

    get connection() {
        return this._connection;
    }
}

module.exports = TwitterDB;
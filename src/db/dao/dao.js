const TwitterDB = require('../db-connection.js');

class Dao {
    constructor(db) {
        this._db = db;
    }

    getColumns() {
        return [];
    }

    getTableName() {
        return '';
    }

    _createColumnsString() {
        let string = '';
        let columns = this.getColumns();
        let first = true;

        for (let i in columns) {
            // doesn;t include comma to the start and to the end of string
            if (first) {
                first = false;
            } else {
                string += ', '
            }

            string += columns[i].name + ' ' + columns[i].type;
        }

        return string;
    }

    _listColumnsString(withoutId) {
        let string = '';

        this.getColumns().forEach((value, index, arr) => {
            // primary key col is always first
            if (index === 0) {
                // doesn't include id col to string
                if (withoutId) {
                    return;
                }
            } else {
                // if id not included then skip first comma insertion
                if (!(withoutId && index === 1)) {
                    string += ', '
                }
            }

            string += value.name;
        });

        return string;
    }

    async createTable() {
        let accounts_table = `CREATE TABLE ${this.getTableName()} (${this._createColumnsString()}, unique(${this.getColumns()[0].name}));`;
        await this._db.query(accounts_table, []);
    }

    async dropTable() {
        let drop_sql = `DROP TABLE IF EXISTS ${this.getTableName()};`;
        await this._db.query(drop_sql, []);
    }

    async insert(arr) {
        let sql = `INSERT INTO ${this.getTableName()} (${this._listColumnsString(true)}) VALUES (${arr[0]}, ${arr[1]}, ${arr[2]});`;
        await this._db.query(sql, []);
    }
    
    

    async delete(id) {
        let sql = `DELETE FROM ${this.getTableName()} WHERE ${this.getColumns()[0].name}=${id};`;
        await this._db.query(sql, []);
    }
}

module.exports = Dao;
const Dao = require('./dao.js');

class AccountsDao extends Dao {
    getColumns() {
        return [
            {name: 'id', type: 'INT AUTO_INCREMENT PRIMARY KEY'},
            {name: 'twitter_id', type: 'BIGINT'},
            {name: 'twitter_name', type: 'VARCHAR(255)'},
            {name: 'eth_address', type: 'VARCHAR(42)'}
        ];
    }

    getTableName() {
        return 'accounts';
    }

    constructor(db) {
        super(db);
    }

    async insert({twitter_id, twitter_name, eth_address}) {
        let find_user_sql = `SELECT twitter_id FROM ${this.getTableName()} WHERE twitter_id = ${twitter_id}`;
        let find_result = await this._db.query(find_user_sql);
        if (find_result.length > 0) {
            let update_sql = `UPDATE ${this.getTableName()} SET eth_address = '${eth_address}' WHERE twitter_id = ${twitter_id}`;
            await this._db.query(update_sql);
        } else {
            return await super.insert([twitter_id, `'${twitter_name}'`, `'${eth_address}'`])
        }
    }
}

module.exports = AccountsDao;
const db = require("./db")

module.exports = {
    listSummary: async () => {
        let queryString = `SELECT * from summary`;
        const summ = await db.query(queryString).catch(err => { throw err });
        console.table(summ);
    },

    updateSummary: async (moneysupply, blocks, coin) => {
        await db.query('UPDATE summary SET moneysupply=?, maxheight=?, lastrun=NOW() WHERE coin=?', 
                        [Math.trunc(moneysupply), blocks, coin]).catch(err => { throw err });
    },

    getDiff: async (coin) => {
        let queryString = `select max(height) m, (select maxheight from summary where coin = ?)-max(height) f from ${coin.toLowerCase()}_block`;
        const d = await db.query(queryString, [coin]).catch(err => { throw err });
        return d
    },

    insertBlock: async (coin, height, time, hash, previousblockhash) => {
        await db.query('INSERT INTO '+coin.toLowerCase()+'_block (height, time, hash, prevhash) VALUES (?,?,?,?)', 
                        [height, time, hash, previousblockhash]).catch(err => { throw err });
    },

    insertTx: async (coin, height, txid, ind) => {
        await db.query('INSERT INTO '+coin.toLowerCase()+'_tx (height, txid, blockindex) VALUES (?,?,?)', 
                        [height, txid, ind]).catch(err => { throw err });
    },
}
const db = require("./db")

module.exports = {
    listSummary: async () => {
        let queryString = `SELECT * from summary`;
        const summ = await db.query(queryString).catch(err => { throw err });
        console.table(summ);
    }
}
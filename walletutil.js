const wcommand = require('./services/walletCommands')

module.exports = {
    getRppc: (coin) => wcommand.getRpcc(coin),

    printInfo: async (rpcc) => {
        let info = await rpcc.getInfo();
        if(info && info.result && info.result.blocks) {
             console.log(info.result)
        }
    }
}

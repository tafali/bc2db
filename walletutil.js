const wcommand = require('./services/walletCommands')

module.exports = {
    getRppc: (coin) => wcommand.getRpcc(coin),

    printInfo: async (rpcc) => {
        let info = await rpcc.getInfo();
        if(info && info.result && info.result.blocks) {
             console.log(info.result)
        }
    },

    getInfo: async (rpcc) => {
        let info = await rpcc.getInfo();
        if(info && info.result && info.result.blocks) {
             return info.result
        }

        return null;
    },

    getBlockHash: async (rpcc, blockid) => {
        let info = await rpcc.getBlockHash(blockid);
        if(info && info.result) {
             return info.result
        }

        return null;
    },

    getBlock: async (rpcc, hash, verbose) => {
        let info = await rpcc.getBlock(hash, verbose);
        if(info && info.result) {
             return info.result
        }

        return null;
    }
}

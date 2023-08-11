const walletConf = require('../config/walletConf')
const { RpcClient } = require('./rpc.service')
const util = require("util"); 

const getRpcc = (coin) => {

    if (!walletConf[coin]) {
        throw new Error(`${coin} is not supported`) 
    }

    const rpcc = new RpcClient(walletConf[coin])

    function _getInfo(callback)  {
        rpcc.getInfo(callback)
    }

    function _getBlockHeader(hash, verbose, callback) {
        rpcc.getBlockHeader(hash, verbose || false, callback)
    }
    
    function _getBlockHash(blockId, callback) {
        rpcc.getBlockHash(+blockId, callback)
    }
    
    function _getNewAddress(callback) {
        rpcc.getNewAddress(callback)
    }
    
    function _getTransaction(txid, callback) {
        rpcc.getTransaction(txid, callback)
    }
    
    function _getBlock(hash, verbose, callback) {
        rpcc.getBlock(hash, verbose || false, callback)
    }
    
    const getInfo = util.promisify(_getInfo).bind(this)
    const getBlockHeader = util.promisify(_getBlockHeader).bind(this)
    const getBlockHash = util.promisify(_getBlockHash).bind(this)
    const getNewAddress = util.promisify(_getNewAddress).bind(this)
    const getTransaction = util.promisify(_getTransaction).bind(this)
    const getBlock = util.promisify(_getBlock).bind(this)

    return {
        getBlockHeader: async (hash, verbose) => {
            const summ = await getBlockHeader(hash, verbose || false).catch(err => { throw err });
            return summ
        },
        
        getBlockHash: async (blockId) => {
            const summ = await getBlockHash(+blockId).catch(err => { throw err });
            return summ
        },
        
        getInfo: async () => {
            const summ = await getInfo().catch(err => { throw err });
            return summ
        },

        getNewAddress: async () => {
            const summ = await getNewAddress().catch(err => { throw err });
            return summ
        },
        
        getTransaction: async (txid) => {
            const summ = await getTransaction(txid).catch(err => { throw err });
            return summ
        },
        
        getBlock: async (hash, verbose) => {
            const summ = await getBlock(hash, verbose || false).catch(err => { throw err });
            return summ
        }
    }
}



module.exports = {
    getRpcc
}


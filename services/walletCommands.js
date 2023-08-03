const walletConf = require('../config/walletConf')
const { RpcClient } = require('./rpc.service')

const getBlockHeader = (coin, hash, verbose, callback) => {

    if (!walletConf[coin]) {
        callback(`${coin} is not supported`) 
        return
    }

    new RpcClient(walletConf[coin])
        .getBlockHeader(hash, verbose || false, callback)
}

const getBlockHash = (coin, blockId, callback) => {

    if (!walletConf[coin]) {
        callback(`${coin} is not supported`) 
        return
    }

    new RpcClient(walletConf[coin])
        .getBlockHash(+blockId, callback)
}

const getInfo = (coin, callback) => {

    if (!walletConf[coin]) {
        callback(`${coin} is not supported`) 
        return
    }

    new RpcClient(walletConf[coin])
        .getInfo(callback)
}

const getNewAddress = (coin, callback) => {

    if (!walletConf[coin]) {
        callback(`${coin} is not supported`)
        return
    }

    new RpcClient(walletConf[coin])
        .getNewAddress(callback)
}

const getTransaction = (coin, txid, callback) => {

    if (!walletConf[coin]) {
        callback(`${coin} is not supported`) 
        return
    }

    new RpcClient(walletConf[coin])
        .getTransaction(txid, callback)
}

module.exports = {
    getBlockHash,
    getBlockHeader,
    getInfo,
    getNewAddress,
    getTransaction
}


const db = require("./db")
const wcommand = require('./services/walletCommands')

db.query('SELECT * from summary', function (error, results, fields) {
  if (error) throw error;
  console.table(results);
});

const coin = 'SAPP'

wcommand.getInfo(coin, async (err, info) => {
  if (err) throw err;

  console.log(coin + ' --> ' + JSON.stringify(info))

  if(info && info.result && info.result.blocks) {
    console.log(info.result)
    db.query('UPDATE summary SET moneysupply=?, maxheight=?, lastrun=NOW() WHERE coin=?', 
            [Math.trunc(info.result.moneysupply), info.result.blocks, coin], 
      function (error, results, fields) {
        if (error) throw error;
        return;
      });
  }
})
/*
wcommand.getTransaction(coin, txid, async (err, txi) => {
  console.log(coin + ' --> ' + JSON.stringify(txi))
  console.log(txi.result.blockhash)

  if(txi.result.blockhash) {
    wcommand.getBlockHeader(coin, txi.result.blockhash, true, async (err, bh) => {
      console.log(bh.result.height)
      txi.result.details.forEach( async det => {
        console.log(det.address)
        console.log(det.amount)
      })
    })
  } // if
})
*/

//db.end();
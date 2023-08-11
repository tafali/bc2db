const dbutil = require('./dbutil')
const walletutil = require('./walletutil')

const coin = 'SAPP'
const sappRpcc = walletutil.getRppc(coin);

dbutil.listSummary()
walletutil.printInfo(sappRpcc)

// wcommand.getInfo(coin, async (err, info) => {
//   if (err) throw err;

//   //console.log(coin + ' getInfo --> ' + JSON.stringify(info))

//   if(info && info.result && info.result.blocks) {
//     //console.log(info.result)

//     db.query('UPDATE summary SET moneysupply=?, maxheight=?, lastrun=NOW() WHERE coin=?', 
//             [Math.trunc(info.result.moneysupply), info.result.blocks, coin], 
//       function (error, results, fields) {
//         if (error) throw error;
//         return;
//       });
//   }
// })

// db.query(`select max(height) m, (select maxheight from summary where coin = ?)-max(height) f from ${coin.toLowerCase()}_block`, [coin], function (error, results, fields) {
//   if (error) throw error;
  
//   if(results[0].f > 0) {
//     const size = results[0].f < 15 ? results[0].f : 15;

//     for (let i = 1; i < size; i++) {
//       insertblock(coin, results[0].m*1 + i)
//     }    
//   } else if(results[0].m == null)
//     insertblock(coin, 1)
// });


// /*
// wcommand.getTransaction(coin, txid, async (err, txi) => {
//   console.log(coin + ' --> ' + JSON.stringify(txi))
//   console.log(txi.result.blockhash)

//   if(txi.result.blockhash) {
//     wcommand.getBlockHeader(coin, txi.result.blockhash, true, async (err, bh) => {
//       console.log(bh.result.height)
//       txi.result.details.forEach( async det => {
//         console.log(det.address)
//         console.log(det.amount)
//       })
//     })
//   } // if
// })
// */

// //db.end();

// /************************************************  */

// async function insertblock(coin, height){
//   wcommand.getBlockHash(coin, height, async (err, info) => {
//     if (err) throw err;
  
//     //console.log(coin + ' getBlockHash --> ' + JSON.stringify(info))
  
//     const bhash = info.result;
  
//     wcommand.getBlock(coin, bhash, true, async (err, info) => {
//       if (err) throw err;
    
//       //console.log(coin + ' getBlock --> ' + JSON.stringify(info))
    
//       if(info && info.result) {
//         //console.log(info.result)
//         db.query('INSERT INTO '+coin.toLowerCase()+'_block (height, time, hash, prevhash) VALUES (?,?,?,?)', 
//                 [info.result.height, info.result.time, info.result.hash, info.result.previousblockhash], 
//           function (error, results, fields) {
//             if (error) throw error;
//             return;
//           });

//           for(let i = 0; i < info.result.tx.length; i++) {
//             db.query('INSERT INTO '+coin.toLowerCase()+'_tx (height, txid, blockindex) VALUES (?,?,?)', 
//                     [info.result.height, info.result.tx[i], i], 
//               function (error, results, fields) {
//                 if (error) throw error;
//                 return;
//               });
//           }
        
//       }
//     })
//   })
// }
const dbutil = require('./dbutil')
const walletutil = require('./walletutil');

async function process(coin){
    const rpcc = await walletutil.getRppc(coin);

    await dbutil.listSummary()
    let lastblk = await walletutil.getInfo(rpcc)

    if (!lastblk){
        console.error("Blok bilgisi yok")
        return
    }

    await dbutil.updateSummary(lastblk.moneysupply, lastblk.blocks, coin)

    let diff = await dbutil.getDiff(coin)
    //console.table(diff)

    if(diff[0].f > 0) {
        const size = diff[0].f < 15 ? diff[0].f : 15;

        for (let i = 1; i < size; i++) {
            await insertblock(rpcc, coin, diff[0].m*1 + i)
        }    
    } else if(diff[0].m == null)
        await insertblock(rpcc, coin, 1)
 
}


process('SAPP')


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

async function insertblock(rpcc, coin, height){

    let bhash = await walletutil.getBlockHash(rpcc, height);
    //console.table(bhash)

    let blk = await walletutil.getBlock(rpcc, bhash, true);

    if(blk) {
        await dbutil.insertBlock(coin, blk.height, blk.time, blk.hash, blk.previousblockhash)

        for(let i = 0; i < blk.tx.length; i++) {
            await dbutil.insertTx(coin, blk.height, blk.tx[i], i)
        }
    } 
}
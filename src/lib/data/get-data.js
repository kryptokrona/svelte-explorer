let api = "https://blocksum.org/api";

export async function getCurrentBlock() {
    const req = await fetch(api + '/json_rpc', {
        method: 'POST',
        cache: 'no-cache',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
            jsonrpc: "2.0",
            id: "test",
            method: "getlastblockheader",
            params: {}
        })
    });
    let res = await req.json()
    return res.result.block_header
}

export async function getByBlockHash(hash) {
    const response = await fetch(api + '/json_rpc', {
        method: 'POST',
        cache: 'no-cache',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
            jsonrpc: "2.0",
            id: "test",
            method: "f_block_json",
            params: {
                hash: hash
            }
        })
    });
    return response.json();
}


export async function getLatestBlocks(numberOfBlocks = 10) {
    //Get current block
    let currentBlock = await getCurrentBlock()
    let currentHeight = currentBlock.height

    let data = []
    for (let i = 0; i < numberOfBlocks; i++) {
        const req = await fetch(api + '/json_rpc', {
            method: "POST",
            dataType: "json",
            body: JSON.stringify({
                jsonrpc: "2.0",
                id: "test",
                method: "getblockheaderbyheight",
                params: {
                    height: (currentHeight - i)
                }
            }),
        });
        const res = await req.json()
        data.push(res.result.block_header)
    }
    return data
}

export async function getTransactions(amount = 10) {
    let currentBlock = await getCurrentBlock()
    let blockHash = currentBlock.hash

    let transactionCount = 0
    let data = []

    for (let i = 0; i < amount; i++) {
        blockHash = await getByBlockHash(blockHash)
        const block = await blockHash.result.block;
            for (let y = 0; y < block.transactions.length; y++) {

                transactionCount++;
            }
            blockHash = block.prev_hash;
        }

    await getByBlockHash(blockHash).then(data => {
        blockHash = data.result.block.prev_hash;
    });
}

export async function getNodeData() {
    const req = await fetch(api + '/getinfo')
    return await req.json()
}
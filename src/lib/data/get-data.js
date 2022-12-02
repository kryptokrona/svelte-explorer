import {goto} from "$app/navigation";

let api = "https://swepool.org/api";

export async function getNodeData() {
    const req = await fetch(api + '/getinfo')
    return await req.json()
}

export async function getCurrentBlock() {
    const req = await fetch(api + '/json_rpc', {
        method: 'POST',
        cache: 'no-cache',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
            jsonrpc: "2.0",
            id: "getCurrentBlock",
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
            id: "getBlockByHash",
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
                id: "getLatestBlock",
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
    const currentBlock = await getCurrentBlock()
    const currentBlockByHash = await getByBlockHash(currentBlock.hash)
    let blockHash = currentBlockByHash.result.block.hash

    let data = []

    let transactions = 0
    for (let i = 0; i < amount; i++) {
        blockHash = await getByBlockHash(blockHash)
        const block = blockHash.result.block;
        for (let y = 0; y < block.transactions.length; y++) {
            if (transactions < amount) {
                data.push(block.transactions[y])
                transactions++
            }
        }
        blockHash = block.prev_hash;
    }
    return data
}

export async function getTransaction(hash) {
    const response = await fetch(api + '/json_rpc', {
        method: 'POST',
        cache: 'no-cache',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
            jsonrpc: "2.0",
            id: "getTransaction",
            method: "f_transaction_json",
            params: {
                hash: hash
            }
        })
    });
    return await response.json();
}

export async function getBlock(height) {
    const response = await fetch(api + '/json_rpc', {
        method: 'POST',
        cache: 'force-cache',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
            jsonrpc: "2.0",
            id: "getBlockByHeight",
            method: "getblockheaderbyheight",
            params: {
                height: height
            }
        })
    });
    return await response.json();
}

export async function search(input) {
    const tx = await getTransaction(input)
    const block = await getByBlockHash(input)

    const numbers = /^[0-9]+$/;

    console.log(block)
    if (input.match(numbers)) {
        goto(`/block/${block.result.block.hash}`)
    }

    if (tx.error) {
        goto(`/block/${input}`)
    } else if (block.error) {
        goto(`/tx/${input}`)
    }
}
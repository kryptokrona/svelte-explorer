import {writable} from "svelte/store";

export const txPool = writable([])

export const fetchMempool = async () => {
    const response = await fetch('https://swepool.org/api/json_rpc', {
        method: 'POST',
        cache: 'no-cache',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
            jsonrpc: "2.0",
            id: "test",
            method: "f_on_transactions_pool_json",
            params: {}
        })
    });
    let data = await response.json();
    txPool.set(data.result.transactions)
}
fetchMempool()
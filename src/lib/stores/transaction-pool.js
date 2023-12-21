import { writable, get } from 'svelte/store';
import { nodeAPI } from './nodes';
import { checkPublicNodes } from '$lib/data/get-data';
export const txPool = writable([]);
let api = get(nodeAPI).active

export const fetchMempool = async () => {
	
	let response
	let error = false
	try {
		 response = await fetch(api + '/json_rpc', {
			method: 'POST',
			cache: 'no-cache',
			redirect: 'follow',
			referrerPolicy: 'no-referrer',
			body: JSON.stringify({
				jsonrpc: '2.0',
				id: 'test',
				method: 'f_on_transactions_pool_json',
				params: {}
			})
		});
	} catch (er) {
		await checkPublicNodes()
		api = get(nodeAPI).active
		error = true
		fetchMempool()
	}
	
	if (error) return
	let data = await response.json();
	txPool.set(data.result.transactions);
};
fetchMempool();

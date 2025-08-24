import { goto } from '$app/navigation';
import { get } from 'svelte/store';
import { nodeAPI } from '$lib/stores/nodes';
let api = get(nodeAPI).active;
const nodesUrl = `https://raw.githubusercontent.com/kryptokrona/kryptokrona-public-nodes/refs/heads/main/nodes.json`

export async function checkPublicNodes(get = false) {
	let response = await fetch(nodesUrl, {}, 1000);
	let nodes = await response.json()
	for (const node of nodes.nodes) {
		if (node.ssl === false) continue
		const test = `https://${node.url.split('/')[0]}:${node.port}${node.url.split('/')[1]?.length ? '/' + node.url.split('/')[1] : ''}`
		const check = await testNode(test)
		if (!check) continue
		if (check) {
			api = test
			nodeAPI.set({active: test})
			break;
		}
	}
	if (!get) return
	getNodeData()
}

async function fetchWithTimeout(resource, options = {}, timeout = 1000) {
	const controller = new AbortController();
	const id = setTimeout(() => controller.abort(), timeout);
	options.signal = controller.signal;

	try {
		const response = await fetch(resource, options);
		return response;
	} finally {
		clearTimeout(id);
	}
}

async function testNode(node) {
	try {
		await fetchWithTimeout(node + '/getinfo', {}, 1000);
		return true;
	} catch (error) {
		// Will throw on timeout or network failure
		return false;
	}
}

export async function testApi() {
	try {
		await fetch(api + '/getinfo', {}, 1000)
		
	} catch (error) {
		await checkPublicNodes()
	}
}

export async function getNodeData() {
	try {
	const req = await fetch(api + '/getinfo', {}, 1000);
	return await req.json();

	} catch(e) {
		//Try get node data again with a new node
		await checkPublicNodes(true)
	}
}

export async function getCurrentBlock() {
	const req = await fetch(api + '/json_rpc', {
		method: 'POST',
		cache: 'no-cache',
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify({
			jsonrpc: '2.0',
			id: 'getCurrentBlock',
			method: 'getlastblockheader',
			params: {}
		})
	});
	let res = await req.json();
	return res.result.block_header;
}

export async function getByBlockHash(hash) {
	const response = await fetch(api + '/json_rpc', {
		method: 'POST',
		cache: 'no-cache',
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify({
			jsonrpc: '2.0',
			id: 'getBlockByHash',
			method: 'f_block_json',
			params: {
				hash: hash
			}
		})
	});
	return response.json();
}

export async function getLatestBlocks(numberOfBlocks = 10) {
	//Get current block
	let currentBlock = await getCurrentBlock();
	let currentHeight = currentBlock.height;

	let data = [];
	for (let i = 0; i < numberOfBlocks; i++) {
		const req = await fetch(api + '/json_rpc', {
			method: 'POST',
			dataType: 'json',
			body: JSON.stringify({
				jsonrpc: '2.0',
				id: 'getLatestBlock',
				method: 'getblockheaderbyheight',
				params: {
					height: currentHeight - i
				}
			})
		});
		const res = await req.json();
		data.push(res.result.block_header);
	}
	return data;
}

export async function getTransactions(amount = 10) {
	const currentBlock = await getCurrentBlock();
	const currentBlockByHash = await getByBlockHash(currentBlock.hash);
	let blockHash = currentBlockByHash.result.block.hash;
	let data = [];

	let transactions = 0;
	for (let i = 0; i < amount; i++) {
		blockHash = await getByBlockHash(blockHash);
		const block = blockHash.result.block;
		for (let y = 0; y < block.transactions.length; y++) {
			if (transactions < amount) {
				data.push(block.transactions[y]);
				transactions++;
			}
		}
		blockHash = block.prev_hash;
	}
	return data;
}

export async function getTransaction(hash) {
	const response = await fetch(api + '/json_rpc', {
		method: 'POST',
		cache: 'no-cache',
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify({
			jsonrpc: '2.0',
			id: 'getTransaction',
			method: 'f_transaction_json',
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
			jsonrpc: '2.0',
			id: 'getBlockByHeight',
			method: 'getblockheaderbyheight',
			params: {
				height: height
			}
		})
	});
	return await response.json();
}

export async function search(input) {
	const tx = await getTransaction(input);
	const block = await getByBlockHash(input);

	const numbers = /^[0-9]+$/;

	if (input.match(numbers)) {
		goto(`/block/${block.result.block.hash}`);
	}

	if (tx.error) {
		goto(`/block/${input}`);
	} else if (block.error) {
		goto(`/tx/${input}`);
	}
}

export const getChartData = async () => {
	let latestBlocks = await getLatestBlocks(100);

	let difficulty_target = 90;
	let transactions = [];
	let blockTime = [];
	let blockSize = [];
	let hashRate = [];
	let difficulty = [];
	let knownBlocks = [];

	for (let i = latestBlocks.length - 1; i >= 0; i--) {
		let block = latestBlocks[i];

		transactions.push(block.num_txes);
		blockTime.push(block.timestamp);
		blockSize.push(block.block_size);
		hashRate.push(block.difficulty / difficulty_target);
		difficulty.push(block.difficulty);
		knownBlocks.push(block);
	}

	return {
		transactions: transactions,
		blockTime: blockTime,
		blockSize: blockSize,
		hashRate: hashRate,
		difficulty: difficulty,
		knownBlocks: knownBlocks
	};
};

export const getHuginData = async (days = 31) => {
	// let cacheURL = Globals.preferences.cache ? Globals.preferences.cache : Config.defaultCache;
	const now = new Date();

	let today_timestamp = parseInt(Date.now() / 1000);
	let yesterday_timestamp = today_timestamp - 86400;
	let boardMessages = [];
	let privateMessages = [];
	let groupMessages = [];
	let labels = [];
	let today_iso = now.toISOString();
	now.setDate(now.getDate() - 1);
	let yesterday_iso = now.toISOString();
	let cacheURL = 'https://api.hugin.chat';

	for (let i = 0; i < days; i++) {
		let thisURLBoards = `${cacheURL}/api/v1/posts?from=${yesterday_timestamp}&to=${today_timestamp}&size=1&page=1`;
		let thisURLPrivate = `${cacheURL}/api/v1/posts-encrypted?from=${yesterday_timestamp}&to=${today_timestamp}&size=1&page=1`;
		let thisURLGroups = `${cacheURL}/api/v1/posts-encrypted-group?from=${yesterday_timestamp}&to=${today_timestamp}&size=1&page=1`;

		try {
			let re_bm = await fetch(thisURLBoards);
			let json_bm = await re_bm.json();
			boardMessages[i] = json_bm.total_pages;

			let re_pvt = await fetch(thisURLPrivate);
			let json_pvt = await re_pvt.json();
			privateMessages[i] = json_pvt.total_pages;

			let re_grps = await fetch(thisURLGroups);
			let json_grps = await re_grps.json();
			groupMessages[i] = json_grps.total_pages;

			labels[i] = today_iso.split('T')[0];

			today_iso = now.toISOString();
			now.setDate(now.getDate() - 1);

			yesterday_iso = now.toISOString();

			today_timestamp = yesterday_timestamp - 1;
			yesterday_timestamp = today_timestamp - 86400;
		} catch (error) {
			continue;
		}
	}
	boardMessages.reverse();
	privateMessages.reverse();
	groupMessages.reverse();
	labels.reverse();

	return {
		boardMessages: boardMessages,
		privateMessages: privateMessages,
		groupMessages: groupMessages,
		labels: labels
	};
};

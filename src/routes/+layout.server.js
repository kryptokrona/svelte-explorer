export let ssr = true;

import {
	getCurrentBlock,
	getLatestBlocks,
	getTransactions,
	getNodeData
} from '$lib/data/get-data.js';

export const load = async () => {
	const fetchCurrentBlock = async () => {
		return await getCurrentBlock();
	};
	const fetchLatestBlocks = async () => {
		return await getLatestBlocks();
	};
	const fetchTransactions = async () => {
		return await getTransactions();
	};
	const fetchNodeData = async () => {
		return await getNodeData();
	};

	return {
		block: fetchCurrentBlock(),
		blocks: fetchLatestBlocks(),
		transactions: fetchTransactions(),
		node: fetchNodeData()
	};
};

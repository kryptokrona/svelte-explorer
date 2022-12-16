export let ssr = true;

import {
	getCurrentBlock,
	getLatestBlocks,
	getTransactions,
	getNodeData
} from '$lib/data/get-data.js';

export const load = async () => {
	return {
		block: getCurrentBlock(),
		blocks: getLatestBlocks(),
		transactions: getTransactions(),
		node: getNodeData()
	};
};

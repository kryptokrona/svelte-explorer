export let ssr = true;

import {
	getCurrentBlock,
	getLatestBlocks,
	getTransactions,
	getNodeData
} from '$lib/data/get-data.js';
import { explorerData } from '$lib/stores/data.js';

const api = 'https://blocksum.org/api';

export async function load() {
	const currentBlock = await getCurrentBlock();
	const latestBlocks = await getLatestBlocks();
	const latestTransactions = await getTransactions(10);
	const nodeData = await getNodeData();

	explorerData.update((current) => {
		return {
			...current,
			node: nodeData,
			block: currentBlock,
			blocks: latestBlocks,
			transactions: latestTransactions
		};
	});
}

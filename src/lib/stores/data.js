import { writable } from 'svelte/store';

export const explorerData = writable({
	node: {},
	block: null,
	blocks: [],
	transactions: [],
	newBlock: false
});

export const chartData = writable({
	transactions: [],
	blockSize: [],
	blockTime: [],
	hashRate: [],
	difficulty: [],
	knownBlocks: [],
	latestBlock: {}
});

export const huginData = writable({
	boardMessages: [],
	privateMessages: [],
	groupMessages: [],
	labels: []
});

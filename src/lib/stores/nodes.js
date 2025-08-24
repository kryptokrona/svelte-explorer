import { writable } from 'svelte/store';

export const nodes = writable([]);
export const nodeAPI = writable({active: "https://blocksum.org/api"});
export const realHeight = writable(0);

export const getNodes = async () => {
	try {
		const response = await fetch('https://raw.githubusercontent.com/kryptokrona/kryptokrona-public-nodes/refs/heads/main/nodes.json', {});
		let data = await response.json();
		return data.nodes;
	} catch (error) {
		console.error('failed fetching nodes ' + error);
	}
	return [];
};

export const getRealHeight = (nodes) => {
	nodes = nodes.filter((n) => n.nodeHeight);
	return Math.max(...nodes.map((n) => n.nodeHeight));
};

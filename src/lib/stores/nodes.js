import { writable } from 'svelte/store';

export const nodes = writable([]);
export const realHeight = writable(0);

export const getNodes = async () => {
	try {
		const response = await fetch('https://blocksum.org/api/v1/nodes', {});
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

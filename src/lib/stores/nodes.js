import { writable } from 'svelte/store';

export const nodes = writable([]);

export const fetchNodes = async () => {
	const response = await fetch('https://blocksum.org/api/v1/nodes', {});
	let data = await response.json();
	nodes.set(data.nodes);
};

fetchNodes();

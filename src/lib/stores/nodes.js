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
	if (nodes.length == 0) return null;
	var modeMap = {};
	var maxEl = nodes[0],
		maxCount = 1;
	for (var i = 0; i < nodes.length; i++) {
		if (!nodes[i].nodeHeight || nodes[i].nodeHeight == 0) continue;
		var height = nodes[i].nodeHeight;
		if (modeMap[height] == null) modeMap[height] = 1;
		else modeMap[height]++;
		if (modeMap[height] > maxCount) {
			maxEl = height;
			maxCount = modeMap[height];
		}
	}
	return maxEl;
};

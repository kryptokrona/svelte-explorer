import { getNodes } from '$lib/stores/nodes';

export let ssr = true;

export const load = async () => {
	const fetchNodes = async () => {
		return await getNodes();
	};

	return { nodes: fetchNodes() };
};

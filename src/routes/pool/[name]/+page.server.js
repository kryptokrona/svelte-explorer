import { getMiningPool } from '$lib/stores/mining-pools';

export let ssr = true;

export const load = async ({ params }) => {
	const fetchPool = async (name) => {
		return await getMiningPool(name);
	};

	return { pool: fetchPool(params.name) };
};

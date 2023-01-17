import { getMiningPools } from '$lib/stores/mining-pools';

export let ssr = true;

export const load = async () => {
	const fetchPools = async () => {
		return await getMiningPools();
	};

	return { pools: fetchPools() };
};

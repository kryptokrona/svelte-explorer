import { writable } from 'svelte/store';

export const pools = writable([]);
export const hashSum = writable(0);
export const realHeight = writable(0);

export const getMiningPools = async () => {
	try {
		const response = await fetch('https://blocksum.org/api/v1/pools');
		const data = await response.json();

		for (let i = 0; i < data.pools.length; i++) {
			if (!data.pools[i].data || data.pools[i].data == '') continue;
			data.pools[i].data.hashrateArray = getHashrateArray(data.pools[i]);
		}

		return data.pools;
	} catch (error) {
		console.error('failed fetching minig pools ' + error);
	}
	return [];
};

export const getMiningPool = async (name) => {
	try {
		const response = await fetch('https://blocksum.org/api/v1/pools/' + name);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('failed fetching minig pools ' + error);
	}
	return {};
};

export const getChartData = (arrayData) => {
	if (!arrayData) return {};

	let labels = [];
	let array = [];
	for (let i = 0; i < arrayData.length; i++) {
		labels.push(arrayData[i][0]);
		array.push(arrayData[i][1]);
	}

	return { labels, array };
};

export const getHashrateArray = (pool) => {
	if (!pool.data?.charts?.hashrate) return [];

	let hashrate = [];
	for (let i = 0; i < pool.data.charts.hashrate.length; i++) {
		hashrate.push(pool.data.charts.hashrate[i][1]);
	}

	return hashrate;
};

export const getChartDataFromObject = (object) => {
	let array = [];
	let labels = [];

	for (const property in object) {
		array.push(object[property]);
		labels.push(property);
	}

	return { array, labels };
};

export const getHashSum = (pools) => {
	let sum = 0;
	for (let i = 0; i < pools.length; i++) {
		if (!pools[i].data?.pool?.hashrate) continue;
		sum += pools[i].data.pool.hashrate;
	}

	return sum;
};

export const getRealHeight = (pools) => {
	pools = pools.filter((p) => p.data?.network);
	return Math.max(...pools.map((p) => p.data.network.height));
};

import { writable } from 'svelte/store';

export const pools = writable([]);

var poolList = [
	{ name: 'Swepool', href: 'https://swepool.org', url: 'https://swepool.org/api/stats' },
	{ name: 'Norpool', href: 'https://norpool.org', url: 'https://norpool.org/api/stats' },
	{
		name: 'Pool-pay',
		href: 'https://xkr.pool-pay.com',
		url: 'https://xkr.pool-pay.com:5383/stats'
	},
	{
		name: 'Gamersnest USA',
		href: 'https://usapool.gamersnest.org',
		url: 'https://usapool.gamersnest.org/api/stats'
	},
	{
		name: 'Privacymine',
		href: 'https://privacymine.net',
		url: 'https://privacymine.net:8117/stats'
	},
	{
		name: 'Gamersnest',
		href: 'https://pool.gamersnest.org',
		url: 'https://pool.gamersnest.org/api/stats'
	},
	{ name: 'Drakpool', href: 'https://drakpool.org', url: 'https://drakpool.com/api/stats' }
];

//Fetch list from github and iterate over all nodes
export const fetchMiningPools = async () => {
	pools.set([]);

	for (const pool of poolList) {
		try {
			const response = await fetch(pool.url);
			let data = await response.json();

			pools.update((current) => [
				...current,
				{
					name: pool.name,
					url: pool.href,
					data
				}
			]);
		} catch (error) {
			console.error('could not fetch minig pool ' + error);
		}
	}
};

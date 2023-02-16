<script>
	import {
		pools,
		realHeight,
		getHashSum,
		getMiningPools,
		getRealHeight
	} from '$lib/stores/mining-pools.js';
	import { prettifyHashrate, getPercentage } from '$lib/utils/index';
	import HashrateTableChart from './components/HashrateTableChart.svelte';
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import { goto } from '$app/navigation';
	import { onMount, onDestroy } from 'svelte';

	export let data;
	$pools = data.pools;
	$realHeight = getRealHeight($pools);
	let interval;

	onDestroy(() => {
		clearInterval(interval);
	});

	onMount(() => {
		interval = setInterval(async () => {
			$pools = await getMiningPools();
			$realHeight = getRealHeight($pools);
		}, 1000 * 10);
	});

	const hasData = (value) => {
		return value != null && value != undefined;
	};
</script>

<div class="container">
	<div class="table-wrapper tw-mt-8">
		<div class="table-header">
			<div class="table-row">
				<h4>Pools</h4>
			</div>
		</div>
		<div class="big-table-body">
			<table>
				<thead>
					<tr>
						<th style="min-width:160px;">Pool</th>
						<th class="tw-text-left" style="min-width:100px;">Miners</th>
						<th class="tw-text-left hide" style="min-width:80px;">Solo Miners</th>
						<th class="tw-text-left" style="min-width:100px;">Fee</th>

						<th class="tw-text-left" style="min-width:100px;">Hashrate History</th>
						<th class="tw-text-left" style="min-width:100px;">Hashrate</th>
						<th class="tw-text-left hide" style="min-width:100px;">Network Hashrate</th>
						<th class="tw-text-left" style="min-width:100px;">Height</th>
					</tr>
				</thead>
				<tbody>
					{#each $pools ?? [] as pool}
						<tr on:click={() => goto(`/pool/${pool.name}`)} class="table-row-clickable">
							<td><a href={pool.url}>{pool.name}</a></td>

							{#if hasData(pool.data?.pool?.miners)}
								<td class="tw-text-left">{pool.data.pool.miners}</td>
							{:else}
								<td class="tw-text-left" />
							{/if}

							{#if hasData(pool.data?.pool?.minersSolo)}
								<td class="tw-text-left hide">{pool.data.pool.minersSolo}</td>
							{:else}
								<td class="tw-text-left hide" />
							{/if}

							{#if hasData(pool.data?.config?.fee)}
								<td class="tw-text-left">{pool.data.config.fee + '%'}</td>
							{:else}
								<td class="tw-text-left" />
							{/if}

							{#if hasData(pool.data?.hashrateArray)}
								<td class="tw-text-left"><HashrateTableChart data={pool.data.hashrateArray} /></td>
							{:else}
								<td class="tw-text-left" />
							{/if}

							{#if hasData(pool.data?.pool?.hashrate)}
								<td class="tw-text-left">{prettifyHashrate(pool.data.pool.hashrate, 2)}</td>
							{:else}
								<td class="tw-text-left" />
							{/if}

							{#if hasData(pool.data?.pool?.hashrate)}
								<td class="tw-text-left hide"
									><ProgressBar
										percentage={getPercentage(getHashSum($pools), pool.data.pool.hashrate, 1)}
									/></td
								>
							{:else}
								<td class="tw-text-left hide" />
							{/if}

							{#if hasData(pool.data?.network?.height)}
								<td
									class={Math.abs($realHeight - pool.data.network.height) > 2
										? 'red tw-text-left"'
										: 'tw-text-left"'}>{pool.data.network.height}</td
								>
							{:else}
								<td class="tw-text-left" />
							{/if}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>

<style lang="scss">
	.red {
		color: var(--red);
	}
	@import '../../theme/big-table.scss';
</style>

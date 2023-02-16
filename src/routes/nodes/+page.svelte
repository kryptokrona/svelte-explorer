<script>
	import { nodes, realHeight, getRealHeight, getNodes } from '$lib/stores/nodes.js';
	import { onMount, onDestroy } from 'svelte';
	import Pill from '$lib/components/Pill.svelte';
	export let data;
	$nodes = data.nodes;
	$realHeight = getRealHeight($nodes);
	let interval;

	onDestroy(() => {
		clearInterval(interval);
	});

	onMount(() => {
		interval = setInterval(async () => {
			$nodes = await getNodes();
			$realHeight = getRealHeight($nodes);
		}, 1000 * 10);
	});
</script>

<div class="container">
	<div class="table-wrapper tw-mt-8">
		<div class="table-header">
			<div class="table-row">
				<h4>Nodes</h4>
			</div>
		</div>
		<div class="big-table-body">
			<table>
				<thead>
					<tr>
						<th style="min-width:180px;">Node Name</th>
						<th style="min-width:240px;">Hostname:Port</th>
						<th style="min-width:100px;">Fee</th>
						<th style="min-width:100px;">Version</th>
						<th style="min-width:100px;">Height</th>
						<th style="min-width:100px;">In/Out (TX)</th>
						<th class="tw-text-center">Status</th>
					</tr>
				</thead>
				<tbody>
					{#each $nodes ?? [] as node}
						<tr>
							<td>{node.nodeName}</td>
							<td>{node.nodeUrl}:{node.nodePort}</td>
							<td>{node.nodeFee}%</td>
							<td>{node.nodeVersion}</td>
							<td class={Math.abs($realHeight - node.nodeHeight) > 2 ? 'red' : ''}
								>{node.nodeHeight}</td
							>
							<td>{node.connectionsIn}/{node.connectionsOut}</td>
							<td class="tw-text-center">
								{#if node.nodeStatus == 'OK'}
									<Pill text="Online" color="green" />
								{:else}
									<Pill text="Offline" color="red" />
								{/if}
							</td>
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

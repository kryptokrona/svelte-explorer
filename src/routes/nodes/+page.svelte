<script>
	import { nodes } from '$lib/stores/nodes.js';
	import Pill from '$lib/components/Pill.svelte';
</script>

<div class="container">
	<div class="wrapper tw-mt-8">
		<div class="table-header">
			<h5>Nodes</h5>
		</div>
		<div class="table-body">
			<table>
				<thead>
					<tr>
						<th style="min-width:180px;">Node Name</th>
						<th style="min-width:240px;">Hostname:Port</th>
						<th class="tw-text-center" style="min-width:80px;">Fee</th>
						<th class="tw-text-center" style="min-width:80px;">Version</th>
						<th class="tw-text-center" style="min-width:80px;">Height</th>
						<th class="tw-text-center" style="min-width:80px;">In/Out (TX)</th>
						<th class="tw-text-center">Status</th>
					</tr>
				</thead>
				<tbody>
					{#each $nodes ?? [] as node}
						<tr>
							<td>{node.nodeName}</td>
							<td>{node.nodeUrl}:{node.nodePort}</td>
							<td class="tw-text-center">{node.nodeFee}%</td>
							<td class="tw-text-center">{node.nodeVersion}</td>
							<td class="tw-text-center">{node.nodeHeight}</td>
							<td class="tw-text-center">{node.connectionsIn}/{node.connectionsOut}</td>
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
	table {
		font-size: 0.9em;
		color: white;
		text-align: left;
		border-collapse: collapse;
	}
	tr {
		border-bottom: 1px solid var(--row-divider-color);
	}
	td {
		opacity: 0.8;
		padding: 10px 4px;
		transition: 150ms ease-in-out;
	}
	th {
		padding: 10px 4px;
		transition: 150ms ease-in-out;
	}
	.wrapper {
		width: auto;
		border: 1px solid var(--table-border-color);
		border-radius: 5px;
	}
	.table-header {
		background-color: var(--table-header-background);
		border-radius: 5px 5px 0 0;
		padding: 10px 1.5rem;
	}
	.table-body {
		display: flex;
		justify-content: center;
		padding: 10px 1.5rem;
		background-color: var(--table-body-background);
		overflow-y: scroll;
		border-radius: 0 0 5px 5px;
		&::-webkit-scrollbar {
			display: none;
		}
	}

	@media screen and (max-width: 768px) {
		.table-body {
			display: block;
		}
	}
</style>

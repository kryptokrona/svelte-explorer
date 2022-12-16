<script>
	import { pools } from '$lib/stores/mining-pools.js';
	import { prettifyHashrate, numberWithCommas } from '$lib/utils/index';
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
						<th style="min-width:120px;">Name</th>
						<th style="min-width:200px;">Url</th>
						<th class="tw-text-center" style="min-width:100px;">Height</th>
						<th class="tw-text-center" style="min-width:100px;">Hashrate</th>
						<th class="tw-text-center" style="min-width:80px;">Solo hashrate</th>
						<th class="tw-text-center" style="min-width:80px;">Miners</th>
						<th class="tw-text-center" style="min-width:80px;">Solo miners</th>
						<th class="tw-text-center" style="min-width:80px;">Fee</th>
					</tr>
				</thead>
				<tbody>
					{#each $pools ?? [] as pool}
						<tr>
							<td>{pool.name}</td>
							<td>{pool.url}</td>
							<td class="tw-text-center">{pool.data.network.height}</td>
							<td class="tw-text-center">{prettifyHashrate(pool.data.pool.hashrate, 2)}</td>
							<td class="tw-text-center"
								>{prettifyHashrate(
									pool.data.pool.hashrateSolo ? pool.data.pool.hashrateSolo : 0,
									2
								)}</td
							>
							<td class="tw-text-center">{numberWithCommas(pool.data.pool.miners)}</td>
							<td class="tw-text-center"
								>{numberWithCommas(pool.data.pool.minersSolo ? pool.data.pool.minersSolo : 0)}</td
							>
							<td class="tw-text-center">{pool.data.config.fee}%</td>
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

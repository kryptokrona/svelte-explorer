<script>
	import { getChartData, getChartDataFromObject } from '$lib/stores/mining-pools.js';
	import { prettifyHashrate, timeConvert, getReadableDifficultyString } from '$lib/utils/index';
	import AreaChart from './components/AreaChart.svelte';
	import ColumnChart from './components/ColumnChart.svelte';

	export let data;
	let pool = data.pool;

	const hasData = (value) => {
		return value != null && value != undefined;
	};
</script>

<div class="container">
	<div class="table-wrapper layered-shadow tw-mt-8">
		<div class="table-header">
			<div class="table-row">
				<h4>
					<a href={pool?.url}>{pool?.name}</a>
				</h4>
			</div>
		</div>
		<div class="table-body">
			<div class="table-row">
				<div class="table-cell">
					<p>Height</p>
				</div>
				<div class="table-cell end">
					{#if hasData(pool.data?.network?.height)}
						<p>{pool.data.network.height}</p>
					{/if}
				</div>
			</div>
			<div class="line" />

			<div class="table-row">
				<div class="table-cell">
					<p>Hashrate</p>
				</div>
				<div class="table-cell end">
					{#if hasData(pool.data?.pool?.hashrate)}
						<p>{prettifyHashrate(pool.data.pool.hashrate, 2)}</p>
					{/if}
				</div>
			</div>
			<div class="line" />

			<div class="table-row">
				<div class="table-cell">
					<p>Fee</p>
				</div>
				<div class="table-cell end">
					{#if hasData(pool.data?.config?.fee)}
						<p>{pool.data.config.fee + '%'}</p>
					{/if}
				</div>
			</div>
			<div class="line" />

			<div class="table-row">
				<div class="table-cell">
					<p>Miners</p>
				</div>
				<div class="table-cell end">
					{#if hasData(pool.data?.pool?.miners)}
						<p>{pool.data.pool.miners}</p>
					{/if}
				</div>
			</div>
			<div class="line" />
			<div class="table-row">
				<div class="table-cell">
					<p>Solo Miners</p>
				</div>
				<div class="table-cell end">
					{#if hasData(pool.data?.pool?.minersSolo)}
						<p>{pool.data.pool.minersSolo}</p>
					{/if}
				</div>
			</div>

			<div class="line" />
			<div class="table-row">
				<div class="table-cell">
					<p>Workers</p>
				</div>
				<div class="table-cell end">
					{#if hasData(pool.data?.pool?.workers)}
						<p>{pool.data.pool.workers}</p>
					{/if}
				</div>
			</div>

			<div class="line" />
			<div class="table-row">
				<div class="table-cell">
					<p>Solo Workers</p>
				</div>
				<div class="table-cell end">
					{#if hasData(pool.data?.pool?.workersSolo)}
						<p>{pool.data.pool.workersSolo}</p>
					{/if}
				</div>
			</div>

			<div class="line" />
			<div class="table-row">
				<div class="table-cell">
					<p>Total blocks</p>
				</div>
				<div class="table-cell end">
					{#if hasData(pool.data?.pool?.totalBlocks)}
						<p>{pool.data.pool.totalBlocks}</p>
					{/if}
				</div>
			</div>

			<div class="line" />
			<div class="table-row">
				<div class="table-cell">
					<p>Last Block Found</p>
				</div>
				<div class="table-cell end">
					{#if hasData(pool.data?.pool?.lastBlockFound)}
						<p>{pool.data.pool.lastBlockFound}</p>
					{/if}
				</div>
			</div>

			<div class="line" />
			<div class="table-row">
				<div class="table-cell">
					<p>Total Payments</p>
				</div>
				<div class="table-cell end">
					{#if hasData(pool.data?.pool?.totalPayments)}
						<p>{pool.data.pool.totalPayments}</p>
					{/if}
				</div>
			</div>

			<div class="line" />
			<div class="table-row">
				<div class="table-cell">
					<p>Total Miners paid</p>
				</div>
				<div class="table-cell end">
					{#if hasData(pool.data?.pool?.totalMinersPaid)}
						<p>{pool.data.pool.totalMinersPaid}</p>
					{/if}
				</div>
			</div>
		</div>
	</div>

	<div class="tw-grid tw-grid-cols-1 tw-gap-6 tw-md:tw-grid-cols-2 lg:tw-grid-cols-2 tw-mt-5">
		{#if hasData(pool.data?.charts?.difficulty)}
			<div class="chart-card tw-mt-4">
				<div class="chart-card-header chart-card-header-dark">
					<h5>Difficulty</h5>
				</div>
				<AreaChart
					data={getChartData(pool.data.charts.difficulty)}
					id="difficulty-chart"
					name="Difficulty"
					color="#f25fd0"
					xAxisFormatter={(value) => {
						return timeConvert(value);
					}}
					yAxisFormatter={(value) => {
						return getReadableDifficultyString(value, 1);
					}}
				/>
			</div>
		{/if}

		{#if hasData(pool.data?.charts?.blocks)}
			<div class="chart-card tw-mt-4">
				<div class="chart-card-header chart-card-header-dark">
					<h5>Blocks</h5>
				</div>
				<ColumnChart
					data={getChartDataFromObject(pool.data.charts.blocks)}
					id="blocks-chart"
					name="Blocks"
					color="#5ff281"
					yAxisFormatter={(value) => {
						return parseInt(value);
					}}
				/>
			</div>
		{/if}

		{#if hasData(pool.data?.charts?.hashrate)}
			<div class="chart-card tw-mt-4">
				<div class="chart-card-header chart-card-header-dark">
					<h5>Hashrate</h5>
				</div>
				<AreaChart
					data={getChartData(pool.data.charts.hashrate)}
					id="hashrate-chart"
					name="Hashrate"
					color="#a65ff2"
					xAxisFormatter={(value) => {
						return timeConvert(value);
					}}
					yAxisFormatter={(value) => {
						return prettifyHashrate(value, 2);
					}}
					;
				/>
			</div>
		{/if}

		{#if hasData(pool.data?.charts?.miners)}
			<div class="chart-card tw-mt-4">
				<div class="chart-card-header chart-card-header-dark">
					<h5>Miners</h5>
				</div>
				<AreaChart
					data={getChartData(pool.data.charts.miners)}
					id="miners-chart"
					name="Miners"
					color="#5f86f2"
					xAxisFormatter={(value) => {
						return timeConvert(value);
					}}
					yAxisFormatter={(value) => {
						return parseInt(value);
					}}
				/>
			</div>
		{/if}
	</div>
</div>

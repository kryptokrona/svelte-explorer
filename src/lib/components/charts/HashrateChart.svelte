<script>
	import { chartData } from '$lib/stores/data';
	import { chartBase } from './chart-base';
	import { Moon } from 'svelte-loading-spinners';
	import { timeConvert, prettifyHashrate } from '$lib/utils/index';
	import { getReadableDifficultyString, getReadableHashRateString } from '$lib/utils/index';
	import Pill from '$lib/components/Pill.svelte';

	let hashrateChart;

	$: update($chartData.hashRate);

	const render = async () => {
		const ApexCharts = (await import('apexcharts')).default;

		hashrateChart = new ApexCharts(document.getElementById('hashrate-chart'), {
			...chartBase,
			colors: ['#f25fd0'],
			series: [
				{
					name: 'Hashrate',
					data: $chartData.hashRate
				}
			],
			xaxis: {
				labels: {
					padding: 0,
					formatter: function (value) {
						return timeConvert(value);
					}
				},
				tooltip: {
					enabled: false
				},
				axisBorder: {
					show: false
				}
			},
			yaxis: {
				labels: {
					padding: 4,
					formatter: function (value) {
						return prettifyHashrate(value, 2);
					}
				}
			},
			labels: $chartData.blockTime
		});
		hashrateChart.render();
	};

	const update = () => {
		if (hashrateChart) {
			hashrateChart.updateOptions({
				series: [
					{
						data: $chartData.hashRate
					}
				],
				xaxis: {
					labels: {
						formatter: function (value) {
							return timeConvert(value);
						}
					}
				},
				yaxis: {
					labels: {
						formatter: function (value) {
							return prettifyHashrate(value, 2);
						}
					}
				},
				labels: $chartData.blockTime
			});
			return;
		}

		if ($chartData.hashRate.length > 0) {
			render();
		}
	};
</script>

<div class="chart-card tw-mt-4">
	<div class="chart-card-header chart-card-header-dark">
		<h5>Hash rate</h5>
		<Pill
			fill={true}
			text={$chartData.hashRate.length
				? getReadableHashRateString($chartData.hashRate[$chartData.hashRate.length - 1])
				: ''}
		/>
		<h5>Difficulty</h5>
		<Pill
			fill={true}
			text={$chartData.difficulty.length
				? getReadableDifficultyString($chartData.difficulty[$chartData.difficulty.length - 1])
				: ''}
		/>
	</div>
	{#if !hashrateChart}
		<div class="spinner-container">
			<Moon color="var(--title-color)" size="30" />
		</div>
	{/if}
	<div id="hashrate-chart" />
</div>

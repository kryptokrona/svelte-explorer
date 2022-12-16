<script>
	import { chartData } from '$lib/stores/data';
	import { chartBase } from './chart-base';
	import { Moon } from 'svelte-loading-spinners';
	import { timeConvert, numberWithCommas } from '$lib/utils/index';
	import Pill from '$lib/components/Pill.svelte';

	let blocksizeChart;

	$: update($chartData.blockSize);

	const render = async () => {
		const ApexCharts = (await import('apexcharts')).default;

		blocksizeChart = new ApexCharts(document.getElementById('blocksize-chart'), {
			...chartBase,
			colors: ['#f2cb5f'],
			series: [
				{
					name: 'Block size',
					data: $chartData.blockSize
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
					show: true
				}
			},
			yaxis: {
				labels: {
					padding: 4,
					formatter: function (value) {
						return numberWithCommas(value);
					}
				}
			},
			labels: $chartData.blockTime
		});
		blocksizeChart.render();
	};

	const update = () => {
		if (blocksizeChart) {
			blocksizeChart.updateOptions({
				series: [
					{
						data: $chartData.blockSize
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
						padding: 4,
						formatter: function (value) {
							return numberWithCommas(value);
						}
					}
				},
				labels: $chartData.blockTime
			});

			return;
		}
		if ($chartData.blockSize.length > 0) {
			render();
		}
	};
</script>

<div class="chart-card  tw-mt-4">
	<div class="chart-card-header chart-card-header-dark">
		<h5>Block size</h5>
		<Pill
			fill={true}
			text={$chartData.blockSize.length
				? $chartData.blockSize[$chartData.blockSize.length - 1]
				: '0'}
		/>
	</div>
	{#if !blocksizeChart}
		<div class="spinner-container">
			<Moon color="var(--title-color)" size="30" />
		</div>
	{/if}
	<div id="blocksize-chart" />
</div>

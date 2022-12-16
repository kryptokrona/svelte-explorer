<script>
	import { chartData } from '$lib/stores/data';
	import { chartBase } from './chart-base';
	import { Moon } from 'svelte-loading-spinners';
	import { timeConvert, numberWithCommas } from '$lib/utils/index';
	import Pill from '$lib/components/Pill.svelte';

	let transactionsChart;

	$: update($chartData.transactions);

	const render = async () => {
		const ApexCharts = (await import('apexcharts')).default;

		transactionsChart = new ApexCharts(document.getElementById('transactions-chart'), {
			...chartBase,
			colors: ['#abf25f'],
			series: [
				{
					name: 'Transactions',
					data: $chartData.transactions
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
						return numberWithCommas(value);
					}
				}
			},
			labels: $chartData.blockTime
		});
		transactionsChart.render();
	};

	const update = () => {
		if (transactionsChart) {
			transactionsChart.updateOptions({
				series: [
					{
						data: $chartData.transactions
					}
				],
				xaxis: {
					labels: {
						formatter: function (value) {
							return timeConvert(value);
						}
					}
				},
				labels: $chartData.blockTime
			});
			return;
		}

		if ($chartData.transactions.length > 0) {
			render();
		}
	};
</script>

<div class="chart-card tw-mt-4">
	<div class="chart-card-header chart-card-header-dark">
		<h5>Transactions</h5>
		<Pill
			color="gray"
			text={$chartData.transactions.length > 0
				? $chartData.transactions[$chartData.transactions.length - 1]
				: 0}
		/>
	</div>
	{#if !transactionsChart}
		<div class="spinner-container">
			<Moon color="var(--title-color)" size="30" />
		</div>
	{/if}
	<div id="transactions-chart" />
</div>

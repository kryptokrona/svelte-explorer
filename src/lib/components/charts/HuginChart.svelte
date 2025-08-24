<script>
	import { huginData } from '$lib/stores/data';
	import { chartBase } from './chart-base';
	import { Moon } from 'svelte-loading-spinners';
	import { numberWithCommas } from '$lib/utils/index';
	import Pill from '$lib/components/Pill.svelte';

	let huginChart;
	let totalActivity = 0;

	$: update($huginData);

	const render = async () => {
		const ApexCharts = (await import('apexcharts')).default;

		huginChart = new ApexCharts(document.getElementById('hugin-chart'), {
			...chartBase,
			colors: ['#5f86f2', '#a65ff2', '#5ff281'],
			series: [
				{
					name: 'Boards messages',
					data: $huginData.boardMessages
				},
				{
					name: 'Private messages',
					data: $huginData.privateMessages
				},
				{
					name: 'Group messages',
					data: $huginData.groupMessages
				}
			],
			xaxis: {
				labels: {
					padding: 0,
					formatter: function (value) {
						return value;
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
						return numberWithCommas(parseInt(value));
					}
				}
			},
			labels: $huginData.labels
		});
		huginChart.render();
	};

	const update = () => {
		totalActivity = getTotalActivity();

		if (huginChart) {
			huginChart.updateOptions({
				series: [
					{
						name: 'Boards messages',
						data: $huginData.boardMessages
					},
					{
						name: 'Private messages',
						data: $huginData.privateMessages
					},
					{
						name: 'Group messages',
						data: $huginData.groupMessages
					}
				],
				xaxis: {
					labels: {
						formatter: function (value) {
							return value;
						}
					}
				},
				labels: $huginData.labels
			});
			return;
		}

		if ($huginData.boardMessages.length > 0) {
			render();
		}
	};

	const getTotalActivity = () => {
		return (
			($huginData.boardMessages.length > 0
				? $huginData.boardMessages[$huginData.boardMessages.length - 1]
				: 0) +
			($huginData.privateMessages.length > 0
				? $huginData.privateMessages[$huginData.privateMessages.length - 1]
				: 0) +
			($huginData.groupMessages.length > 0
				? $huginData.groupMessages[$huginData.groupMessages.length - 1]
				: 0)
		);
	};
</script>

<div class="chart-card tw-mt-4">
	<div class="chart-card-header chart-card-header-dark">
		<h5>Hugin Activity</h5>
		<Pill color="gray" text={totalActivity} />
	</div>
	{#if !huginChart}
		<div class="spinner-container">
			<!-- <Moon color="var(--title-color)" size="30" /> -->
			<p style="text-align: center">Under construction 👷🚧🏗️</p>
		</div>
	{/if}
	
	<div id="hugin-chart" />
</div>

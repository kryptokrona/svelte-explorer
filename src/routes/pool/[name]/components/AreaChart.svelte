<script>
	import { onMount } from 'svelte';
	import { chartBase } from '$lib/components/charts/chart-base';

	export let data = [];
	export let id = 0;
	export let name = '';
	export let color = '#a65ff2';
	export let xAxisFormatter;
	export let yAxisFormatter;

	onMount(() => {
		render();
	});

	let areaChart;

	const render = async () => {
		const ApexCharts = (await import('apexcharts')).default;
		areaChart = new ApexCharts(document.getElementById(id.toString()), {
			...chartBase,
			colors: [color],
			series: [
				{
					name: name,
					data: data.array
				}
			],
			xaxis: {
				tickAmount: 10,
				labels: {
					formatter: xAxisFormatter
				},

				tooltip: {
					enabled: false
				},
				axisBorder: {
					show: false
				}
			},
			yaxis: {
				align: 'right',
				labels: {
					formatter: yAxisFormatter
				}
			},
			labels: data.labels
		});
		areaChart.render();
	};
</script>

<div {id} />

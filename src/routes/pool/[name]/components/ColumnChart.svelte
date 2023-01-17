<script>
	import { onMount } from 'svelte';

	export let data = [];
	export let id = 0;
	export let name = '';
	export let color = '#a65ff2';
	export let xAxisFormatter;
	export let yAxisFormatter;

	onMount(() => {
		render();
	});

	let columnChart;

	const render = async () => {
		const ApexCharts = (await import('apexcharts')).default;
		columnChart = new ApexCharts(document.getElementById(id.toString()), {
			chart: {
				type: 'bar',
				fontFamily: 'inherit',
				height: 100.0,
				sparkline: {
					enabled: true
				},
				animations: {
					enabled: false
				}
			},
			dataLabels: {
				enabled: false
			},
			fill: {
				opacity: 0.16,
				type: 'gradient',
				gradient: {
					shade: 'dark',
					type: 'vertical',
					shadeIntensity: 0.5,
					gradientToColors: undefined,
					inverseColors: true,
					opacityFrom: 1,
					opacityTo: 0,
					stops: [0, 100],
					colorStops: []
				}
			},
			stroke: {
				width: 2,
				lineCap: 'round',
				curve: 'smooth'
			},
			grid: {
				show: false
			},
			colors: [color],
			series: [
				{
					name: name,
					data: data.array
				}
			],
			xaxis: {
				axisTicks: {
					show: false
				},
				labels: {
					formatter: xAxisFormatter
				}
			},
			yaxis: {
				labels: {
					formatter: yAxisFormatter
				}
			},
			labels: data.labels
		});
		columnChart.render();
	};
</script>

<div {id} />

export const chartBase = {
	chart: {
		type: 'area',
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
		strokeDashArray: 4
	},
	legend: {
		show: false
	}
};

<script>
	export let height = 20;
	export let width = 100;
	export let color = '#a65ff2';
	export let strokeWidth = 1;
	export let data = [];

	const min = Math.min(...data);
	const max = Math.max(...data);

	let pixelPoints = data
		.map((n, i) => {
			return `${i * (width / (data.length - 1))},` + (((max - n) / (max - min)) * height).toFixed();
		})
		.join(' ');
</script>

<div>
	<svg
		{width}
		{height}
		viewBox="0 0 {width} {height}"
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
	>
		<defs>
			<linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient">
				<stop stop-color={color} stop-opacity="0.2" offset="0%" />
				<stop stop-color={color} stop-opacity="0" offset="100%" />
			</linearGradient>
		</defs>
		<g stroke="none" fill="none" fill-rule="evenodd">
			<g id="Sparkline">
				<polyline
					stroke-linejoin="round"
					id="line"
					stroke={color}
					stroke-width={strokeWidth}
					points={pixelPoints}
				/>
				<polygon
					stroke-linejoin="round"
					id="gradient"
					fill="url(#linearGradient)"
					points={'0 ' + height + ' ' + pixelPoints + ' ' + width + ' ' + height}
				/>
			</g>
		</g>
	</svg>
</div>

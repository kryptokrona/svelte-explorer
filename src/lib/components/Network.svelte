<script>
	import { explorerData } from '$lib/stores/data.js';
	import { prettifyHashrate } from '$lib/utils';
</script>

<div class="container">
	<div
		class="tw-grid tw-grid-cols-2 tw-gap-3 tw-md:tw-grid-cols-4 lg:tw-grid-cols-4 tw-mb-8 tw-mt-8"
	>
		<div class="card">
			<h2>Height</h2>
			<p>{$explorerData.node.height}</p>
		</div>
		<div class="card">
			<h2>Hashrate</h2>
			<p>{prettifyHashrate($explorerData.node.hashrate, 2)}</p>
		</div>
		<div class="card">
			<h2>Difficulty</h2>
			<p>{($explorerData.node.difficulty / 1000000).toFixed(2)} M</p>
		</div>
		<div class="card">
			<h2>Difficulty</h2>
			<p>{($explorerData.node.difficulty / 1000000).toFixed(2)} M</p>
		</div>
	</div>
</div>

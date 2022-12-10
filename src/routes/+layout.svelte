<script>
	import '../theme/tailwind.css';
	import toast, { Toaster } from 'svelte-french-toast';
	import { appState } from '$lib/stores/app-state.js';
	import LoadingScreen from '$lib/components/LoadingScreen.svelte';
	import { onMount } from 'svelte';
	import { explorerData, chartData, huginData } from '$lib/stores/data.js';
	import {
		getCurrentBlock,
		getLatestBlocks,
		getNodeData,
		getTransactions,
		getChartData,
		getHuginData
	} from '$lib/data/get-data.js';
	import { fetchMempool } from '$lib/stores/transaction-pool.js';
	import { checkIfNewBlock } from '$lib/utils/index.js';
	import Navbar from '$lib/components/Navbar.svelte';

	let prevBlock;
	let currentBlock;

	onMount(async () => {
		chartData.set(await getChartData());
		huginData.set(await getHuginData());

		chartData.update((current) => {
			return {
				...current,
				hugin: huginData
			};
		});

		setTimeout(() => {
			$appState.loading = false;
		}, 1000);

		prevBlock = $explorerData.block;
		setInterval(async () => {
			prevBlock = $explorerData.block;
			$explorerData.node = await getNodeData();
			$explorerData.transactions = await getTransactions();
			$explorerData.block = await getCurrentBlock();
			$explorerData.blocks = await getLatestBlocks();
			$chartData = await getChartData();
			currentBlock = $explorerData.block;

			await fetchMempool();

			if (checkIfNewBlock(prevBlock, currentBlock)) {
				toast.success(`Block ${currentBlock.height} found!`, {
					position: 'top-center'
				});
				$explorerData.newBlock = true;
				setTimeout(() => {
					$explorerData.newBlock = false;
				}, 1000);
			}
		}, 1000 * 10);

		setInterval(async () => {
			const latestHuginData = await getHuginData(1);
			$huginData.groupMessages[0] = latestHuginData.groupMessages[0];
			$huginData.privateMessages[0] = latestHuginData.privateMessages[0];
			$huginData.boardMessages[0] = latestHuginData.boardMessages[0];
		}, 1000 * 60);
	});
</script>

<!--Loading screen with animated logo-->
{#if $appState.loading}
	<LoadingScreen />
{/if}

<Toaster />

<!--Page content-->
<Navbar />
<slot />

<style global lang="scss">
	@import '../theme/global.scss';
	@import '../theme/variables.scss';
</style>

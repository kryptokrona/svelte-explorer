<script>
	import { Toaster } from 'svelte-french-toast';
	import Navbar from '$lib/components/Navbar.svelte';
	import toast from 'svelte-french-toast';
	import LoadingScreen from '$lib/components/LoadingScreen.svelte';
	import { appState } from '$lib/stores/app-state.js';
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

	let prevBlock;
	let currentBlock;

	export let data;
	$explorerData = data;

	onMount(async () => {
		setTimeout(() => {
			$appState.loading = false;
		}, 1000);

		loadChartData();
		loadHuginData();

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
			if (latestHuginData.groupMessages[0]) {
				$huginData.groupMessages[0] = latestHuginData.groupMessages[0];
			}
			if (latestHuginData.privateMessages[0]) {
				$huginData.privateMessages[0] = latestHuginData.privateMessages[0];
			}
			if (latestHuginData.boardMessages[0]) {
				$huginData.boardMessages[0] = latestHuginData.boardMessages[0];
			}
		}, 1000 * 60);
	});

	const loadChartData = async () => {
		chartData.set(await getChartData());
	};
	const loadHuginData = async () => {
		huginData.set(await getHuginData());
	};
</script>

<Toaster />

{#if $appState.loading}
	<LoadingScreen />
{/if}

<!--Page content-->
<Navbar />
<slot />

<style global lang="scss">
	@import '../theme/tailwind.css';
	@import '../theme/global.scss';
	@import '../theme/variables.scss';
</style>

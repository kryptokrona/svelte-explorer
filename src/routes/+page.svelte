<script>
	import '../theme/tailwind.css';
	import TransactionPool from '$lib/components/tables/TransactionPool.svelte';
	import LatestBlocks from '$lib/components/tables/LatestBlocks.svelte';
	import Network from '$lib/components/Network.svelte';
	import LatestTransactions from '$lib/components/tables/LatestTransactions.svelte';
	import Blockchain from '$lib/components/Blockchain.svelte';
	import HuginChart from '$lib/components/charts/HuginChart.svelte';
	import TransactionsChart from '$lib/components/charts/TransactionsChart.svelte';
	import HashrateChart from '$lib/components/charts/HashrateChart.svelte';
	import BlocksizeChart from '$lib/components/charts/BlocksizeChart.svelte';
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
	explorerData.set(data);

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

{#if $appState.loading}
	<LoadingScreen />
{/if}

<Network />
<div class="container">
	<Blockchain />
	<TransactionPool />
</div>
<div class="container">
	<div class="tw-grid tw-grid-cols-1 tw-gap-6 tw-md:tw-grid-cols-2 lg:tw-grid-cols-2 tw-mt-5">
		<HuginChart />
		<HashrateChart />
	</div>
</div>

<div class="container ">
	<div class="tw-grid tw-grid-cols-1 tw-gap-6 tw-md:tw-grid-cols-2 lg:tw-grid-cols-2 tw-mt-5">
		<BlocksizeChart />
		<TransactionsChart />
	</div>
</div>
<div class="container">
	<div class=" tw-grid tw-grid-cols-1 tw-gap-6 tw-md:tw-grid-cols-2 lg:tw-grid-cols-2 tw-mt-5">
		<LatestBlocks />
		<LatestTransactions />
	</div>
</div>

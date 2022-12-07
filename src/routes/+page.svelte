<script>
	import TransactionPool from '$lib/components/tables/TransactionPool.svelte';
	import LatestBlocks from '$lib/components/tables/LatestBlocks.svelte';
	import Network from '$lib/components/Network.svelte';
	import LatestTransactions from '$lib/components/tables/LatestTransactions.svelte';
	import Blockchain from '$lib/components/Blockchain.svelte';
	import HuginChart from '$lib/components/charts/HuginChart.svelte';
	import TransactionsChart from '$lib/components/charts/TransactionsChart.svelte';
	import HashrateChart from '$lib/components/charts/HashrateChart.svelte';
	import BlocksizeChart from '$lib/components/charts/BlocksizeChart.svelte';
</script>

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

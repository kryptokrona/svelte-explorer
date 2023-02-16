<script>
	import { txPool } from '$lib/stores/transaction-pool.js';
	import { formatXksAmount } from '$lib/utils/index.js';
	import Pill from '$lib/components/Pill.svelte';
</script>

<div style="width: 100%">
	<div class="title">
		<h2>Mempool</h2>
		<Pill text={$txPool.length} />
	</div>
	<div class="table-wrapper ">
		<div class="table-header">
			<div class="table-row">
				<div class="table-cell"><h5>Hash</h5></div>
				<div class="table-cell end"><h5>Amount (XKR)</h5></div>
				<div class="table-cell end hide"><h5>Fee (XKR)</h5></div>
			</div>
		</div>
		<div class="table-body">
			{#each $txPool ?? [] as tx}
				<div class="table-row">
					<div class="table-cell">
						<p>{tx.hash.substring(0, 6) + '..' + tx.hash.substring(58, tx.hash.length)}</p>
					</div>
					<div class="table-cell end"><p>{formatXksAmount(tx.amount_out / 100000, 2)}</p></div>
					<div class="table-cell end hide"><p>{formatXksAmount(tx.fee / 100000, 2)}</p></div>
				</div>
				<div class="line" />
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.table-cell {
		width: 120px;
	}

	.table-body {
		height: 282px;
	}
</style>

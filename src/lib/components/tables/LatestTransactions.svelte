<script>
	import { explorerData } from '$lib/stores/data.js';
	import { formatXksAmount } from '$lib/utils/index.js';
	import { goto } from '$app/navigation';
</script>

<div style="width: 100%">
	<div class="title">
		<h2>Transactions</h2>
	</div>
	<div class="table-wrapper">
		<div class="table-header">
			<div class="table-row-header">
				<div class="table-cell"><h5>Hash</h5></div>
				<div class="table-cell end"><h5>Amount (XKR)</h5></div>
				<div class="table-cell end hide"><h5>Fee (XKR)</h5></div>
			</div>
		</div>
		<div class="table-body">
			{#each $explorerData.transactions ?? [] as tx}
				<div class="table-row table-row-clickable" on:click={() => goto(`/tx/${tx.hash}`)}>
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
		width: 140px;
	}
</style>

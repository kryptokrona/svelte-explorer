<script>
    import {txPool} from "$lib/stores/transaction-pool.js";
    import {fade} from 'svelte/transition'
    import {formatXksAmount} from "$lib/utils/index.js";
    import Pill from "$lib/components/Pill.svelte";
    import {onMount} from "svelte";
    import {getNodeData} from "$lib/data/get-data.js";
    import {explorerData} from "$lib/stores/data.js";
</script>

<div class="container">
    <div class="title">
        <h2>Mempool</h2>
        <Pill text={$txPool.length}/>
    </div>
    <div class="wrapper layered-shadow">
        <div class="table-header">
            <div class="table-row">
                <div class="table-cell hide"><h4>Time</h4></div>
                <div class="table-cell"><h4>Hash</h4></div>
                <div class="table-cell end"><h4>Amount</h4></div>
                <div class="table-cell end hide"><h4>Fee</h4></div>
            </div>
        </div>
        <div class="table-body">
            {#each $txPool ?? [] as tx}
                <div in:fade out:fade class="table-row">
                    <div class="table-cell hide"><p>a minute ago</p></div>
                    <div class="table-cell">
                        <p>{tx.hash.substring(0, 6) + ".." + tx.hash.substring(58, tx.hash.length)}</p>
                    </div>
                    <div class="table-cell end"><p>{formatXksAmount((tx.amount_out / 100000), 2)}</p></div>
                    <div class="table-cell end hide"><p>{formatXksAmount((tx.fee / 100000), 2)}</p></div>
                </div>
                <div class="line"></div>
            {/each}
        </div>
    </div>
</div>

<style lang="scss">

  .wrapper {
    border: 1px solid var(--table-border-color);
    border-radius: 5px
  }

  .title {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    margin: 1rem;
  }

  .table-header {
    background-color: var(--table-header-background);
    border-radius: 5px 5px 0 0;
  }

  .table-row {
    display: flex;
    justify-content: space-between;
    padding: 10px 2rem;
  }

  .table-cell {
    width: 120px;
  }

  .table-body {
    background-color: var(--table-body-background);
    max-height: 300px;
    min-height: 200px;
    overflow: scroll;
    border-radius: 0 0 5px 5px;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .end {
    text-align: end;
  }

  @media screen and (max-width: 568px) {
    .hide {
      display: none;
    }
  }
</style>
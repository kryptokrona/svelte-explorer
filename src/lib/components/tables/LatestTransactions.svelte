<script>
    import {explorerData} from "$lib/stores/data.js";
    import {fade} from 'svelte/transition'
    import {formatXksAmount} from "$lib/utils/index.js";
</script>

<div style="width: 100%">
    <div class="title">
        <h2>Transactions</h2>
    </div>
    <div class="wrapper layered-shadow">
        <div class="table-header">
            <div class="table-row">
                <div class="table-cell"><h4>Hash</h4></div>
                <div class="table-cell end"><h4>Amount</h4></div>
                <div class="table-cell end fee"><h4>Fee</h4></div>
            </div>
        </div>
        <div class="table-body">
            {#each $explorerData.transactions ?? [] as tx}
                <div in:fade out:fade class="table-row">
                    <div class="table-cell">
                        <p>{tx.hash.substring(0, 6) + ".." + tx.hash.substring(58, tx.hash.length)}</p>
                    </div>
                    <div class="table-cell end"><p>{formatXksAmount((tx.amount_out / 100000), 2)}</p></div>
                    <div class="table-cell end fee"><p>{formatXksAmount((tx.fee / 100000), 2)}</p></div>
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
    padding: 10px 1.5rem;
  }

  .table-cell {
    width: 100px;
  }

  .table-body {
    background-color: var(--table-body-background);
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
    .fee {
      display: none;
    }
  }
</style>
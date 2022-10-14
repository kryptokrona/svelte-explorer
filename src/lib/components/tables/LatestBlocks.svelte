<script>
    import {explorerData} from "$lib/stores/data.js";
    import {formatXksAmount} from "$lib/utils/index.js";
    import {goto} from "$app/navigation";
</script>

<div style="width: 100%">
    <div class="title">
        <h2>Blocks</h2>
    </div>
    <div class="wrapper layered-shadow">
        <div class="table-header">
            <div class="table-row-header">
                <div class="table-cell"><h4>Height</h4></div>
                <div class="table-cell end hide"><h4>Transactions</h4></div>
                <div class="table-cell end"><h4>Reward</h4></div>
            </div>
        </div>
        <div class="table-body">
            {#each $explorerData.blocks ?? [] as block}
                <div class="table-row" on:click={() => goto(`/block/${block.hash}`)}>
                    <div class="table-cell"><p>{block.height}</p></div>
                    <div class="table-cell end hide"><p>{block.num_txes} TX's</p></div>
                    <div class="table-cell end"><p>{formatXksAmount((block.reward / 100000), 2)} XKR</p></div>
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

  .table-row-header {
    display: flex;
    justify-content: space-between;
    padding: 10px 1.5rem;
  }

  .table-row {
    display: flex;
    justify-content: space-between;
    padding: 10px 1.5rem;
    transition: 150ms ease-in-out;

    &:hover {
      background-color: var(--table-row-hover);
      cursor: pointer;
    }
  }

  .table-cell {
    min-width: 120px;
  }

  .table-body {
    background-color: var(--table-body-background);
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
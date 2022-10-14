<script>

    import {goto} from "$app/navigation";

    export let data = []

    console.log(data)

</script>

<div class="container">
    <div class="title">
        <h2>Block {data.height}</h2>
    </div>
    <div class="wrapper layered-shadow">
        <div class="table-header">
            <div class="table-row">
                <div><h4>Hash: {data.hash.substring(0, 6) + ".." + data.hash.substring(58, data.hash.length)}</h4></div>
            </div>
        </div>
        <div class="table-body">
            <div class="table-row">
                <div class="table-cell">
                    <p>Time</p>
                </div>
                <div class="table-cell end">
                    <p>{data.timestamp}</p>
                </div>
            </div>
            <div class="line"></div>
            <div class="table-row">
                <div class="table-cell">
                    <p>Difficulty</p>
                </div>
                <div class="table-cell end">
                    <p>{(data.difficulty / 1000000).toFixed(2)} M</p>
                </div>
            </div>
            <div class="line"></div>
            <div class="table-row">
                <div class="table-cell">
                    <p>Reward</p>
                </div>
                <div class="table-cell end">
                    <p>{(data.reward / 100000).toFixed(2)} XKR</p>
                </div>
            </div>
            <div class="line"></div>
            <div class="table-row">
                <div class="table-cell">
                    <p>Total fees</p>
                </div>
                <div class="table-cell end">
                    <p>{data.totalFeeAmount} XKR</p>
                </div>
            </div>
            <div class="line"></div>
            <div class="table-row">
                <div class="table-cell">
                    <p>Block size</p>
                </div>
                <div class="table-cell end">
                    <p>{data.blockSize}</p>
                </div>
            </div>
            <div class="line"></div>
            <div class="table-row hoverThis" on:click={() => goto(`/block/${data.prev_hash}`)}>
                <div class="table-cell">
                    <p>Previous hash</p>
                </div>
                <div class="table-cell end">
                    <p>{data.prev_hash.substring(0, 6) + ".." + data.prev_hash.substring(58, data.prev_hash.length)}</p>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="container">
    <div class="title">
        <h2>Transactions</h2>
    </div>
    <div class="wrapper layered-shadow">
        <div class="table-header">
            <div class="table-row">
                <div class="table-cell"><h4>Hash</h4></div>
                <div class="table-cell end"><h4>Amount (XKR)</h4></div>
                <div class="table-cell end hide"><h4>Fee (XKR)</h4></div>
            </div>
        </div>
        <div class="table-body">
            {#each data.transactions as tx}
                <div class="table-row hoverThis" on:click={() => goto(`/tx/${tx.hash}`)}>
                    <div class="table-cell">
                        <p>{tx.hash.substring(0, 6) + ".." + tx.hash.substring(58, tx.hash.length)}</p>
                    </div>
                    <div class="table-cell end">
                        <p>{tx.amount_out}</p>
                    </div>
                    <div class="table-cell end hide">
                        <p>{tx.fee}</p>
                    </div>
                </div>
                <div class="line"></div>
            {/each}
        </div>
    </div>
</div>

<style lang="scss">

  .hoverThis {
    transition: 150ms ease-in-out;
    &:hover {
      background-color: var(--table-row-hover);
      cursor: pointer;
    }
  }

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
    width: 135px;
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
    .hide {
      display: none;
    }
  }
</style>
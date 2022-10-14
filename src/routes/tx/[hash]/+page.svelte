<script>
    import {explorerData} from "$lib/stores/data.js";
    import {onMount} from "svelte";

    export let data = []

    console.log(data)

</script>

<div class="container">
    <div class="title">
        <h2>Transaction</h2>
    </div>
    <div class="wrapper layered-shadow">
        <div class="table-header">
            <div class="table-row">
                <div><h4>
                    Hash: {data.txDetails.hash.substring(0, 6) + ".." + data.txDetails.hash.substring(58, data.txDetails.hash.length)}</h4>
                </div>
            </div>
        </div>
        <div class="table-body">
            <div class="table-row">
                <div class="table-cell">
                    <p>In block</p>
                </div>
                <div class="table-cell end">
                    <p>{data.block.height}</p>
                </div>
            </div>
            <div class="line"></div>
            <div class="table-row">
                <div class="table-cell">
                    <p>Time</p>
                </div>
                <div class="table-cell end">
                    <p>{data.block.timestamp}</p>
                </div>
            </div>
            <div class="line"></div>
            <div class="table-row">
                <div class="table-cell">
                    <p>Confirmations</p>
                </div>
                <div class="table-cell end">
                    <p>{($explorerData.block.height - data.block.height)}</p>
                </div>
            </div>
            <div class="line"></div>
            <div class="table-row">
                <div class="table-cell">
                    <p>Payment ID</p>
                </div>
                <div class="table-cell end">
                    <p>{data.txDetails.paymentId ? data.txDetails.paymentId : 'N/A'}</p>
                </div>
            </div>
            <div class="line"></div>
            <div class="table-row">
                <div class="table-cell">
                    <p>Amount</p>
                </div>
                <div class="table-cell end">
                    <p>{data.txDetails.amount_out}</p>
                </div>
            </div>
            <div class="line"></div>
            <div class="table-row">
                <div class="table-cell">
                    <p>Fee</p>
                </div>
                <div class="table-cell end">
                    <p>{data.txDetails.fee}</p>
                </div>
            </div>
            <div class="line"></div>
            <div class="table-row">
                <div class="table-cell">
                    <p>Mixin</p>
                </div>
                <div class="table-cell end">
                    <p>{data.txDetails.mixin}</p>
                </div>
            </div>
            <div class="line"></div>
            <div class="table-row">
                <div class="table-cell">
                    <p>Size</p>
                </div>
                <div class="table-cell end">
                    <p>{data.txDetails.size}</p>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="container">
    <div class="title">
        <h2>Outputs</h2>
    </div>
    <div class="wrapper layered-shadow">
        <div class="table-header">
            <div class="table-row">
                <div class="table-cell"><h4>Amount</h4></div>
                <div class="table-cell end"><h4>Key Image</h4></div>
                <div class="table-cell end hide"><h4>type</h4></div>
            </div>
        </div>
        <div class="table-body">
            {#each data.tx.vout as output}
                <div class="table-row">
                    <div class="table-cell">
                        <p>{output.amount}</p>
                    </div>
                    <div class="table-cell end">
                        <p>{output.target.data.key.substring(0, 6) + ".." + output.target.data.key.substring(58, output.target.data.key.length)}</p>
                    </div>
                    <div class="table-cell end hide">
                        <p>{output.target.type}</p>
                    </div>
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
    width: 130px;
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
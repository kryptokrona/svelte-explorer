<script>
    import {explorerData} from "$lib/stores/data.js";
    import {formatXksAmount} from "$lib/utils/index.js";
    import {goto} from "$app/navigation";
</script>

<div style="width: 100%">
    <div class="title">
        <h2>Blocks</h2>
    </div>
    <div class="table-wrapper">
        <div class="table-header">
            <div class="table-row-header">
                <div class="table-cell"><h5>Height</h5></div>
                <div class="table-cell end hide"><h5>Transactions</h5></div>
                <div class="table-cell end"><h5>Reward (XKR)</h5></div>
            </div>
        </div>
        <div class="table-body">
            {#each $explorerData.blocks ?? [] as block}
                <div class="table-row table-row-clickable" on:click={() => goto(`/block/${block.hash}`)}>
                    <div class="table-cell"><p>{block.height}</p></div>
                    <div class="table-cell end hide"><p>{block.num_txes} TX's</p></div>
                    <div class="table-cell end"><p>{formatXksAmount((block.reward / 100000), 2)}</p></div>
                </div>
                <div class="line"></div>
            {/each}
        </div>
    </div>
</div>
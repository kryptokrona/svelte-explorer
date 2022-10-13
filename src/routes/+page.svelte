<script>
    import TransactionPool from "$lib/components/tables/TransactionPool.svelte";
    import LatestBlocks from "$lib/components/tables/LatestBlocks.svelte";
    import Network from "$lib/components/Network.svelte";
</script>

<Network/>
<TransactionPool/>
<LatestBlocks/>
<div class="table-grid container">

</div>

<style lang="scss">
    .table-grid {
      display: grid;
      grid-template-colums: repeat(12, minmax(0, 1fr))
    }
</style>

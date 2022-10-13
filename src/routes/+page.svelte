<script>
    import TransactionPool from "$lib/components/tables/TransactionPool.svelte";
    import LatestBlocks from "$lib/components/tables/LatestBlocks.svelte";
    import Network from "$lib/components/Network.svelte";
    import LatestTransactions from "$lib/components/tables/LatestTransactions.svelte";
</script>

<Network/>
<div class="container">
    <TransactionPool/>
</div>
<div class="table-pair container">
    <LatestBlocks/>
    <LatestTransactions/>
</div>

<style lang="scss">
  .table-pair {
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 1rem;

    @media screen and (max-width: 868px){
        flex-direction: column;
    }
  }
</style>

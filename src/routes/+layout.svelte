<script>
    import toast, { Toaster } from "svelte-french-toast";
    import {appState} from "$lib/stores/app-state.js";
    import LoadingScreen from "$lib/components/LoadingScreen.svelte";
    import {onMount} from "svelte";
    import {explorerData} from "$lib/stores/data.js";
    import {getCurrentBlock, getLatestBlocks, getNodeData, getTransactions} from "$lib/data/get-data.js";

    onMount(() => {
        setTimeout(() => {
            $appState.loading = false
        }, 1000)

        setInterval(async () => {
            $explorerData.node = await getNodeData()
            $explorerData.transactions = await getTransactions()
            $explorerData.block = await getCurrentBlock()
            $explorerData.blocks = await getLatestBlocks()
        }, 1000 * 10)
    });

</script>



<!--Loading screen with animated logo-->
{#if $appState.loading}
    <LoadingScreen/>
{/if}

<!--Page content-->
<slot />


<style global lang="scss">
  @import '../theme/global.scss';
  @import '../theme/variables.scss';

</style>

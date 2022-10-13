<script>
    import toast, { Toaster } from "svelte-french-toast";
    import {appState} from "$lib/stores/app-state.js";
    import LoadingScreen from "$lib/components/LoadingScreen.svelte";
    import {onMount} from "svelte";

    onMount(() => {
        setTimeout(() => {
            $appState.loading = false
        }, 1000)
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

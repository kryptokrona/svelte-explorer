<script>
	import '../theme/tailwind.css';
	import { Toaster } from 'svelte-french-toast';
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<!--Loading screen with animated logo
{#if $appState.loading}
	<LoadingScreen />
{/if}
-->
<Toaster />

<!--Page content-->
<Navbar />
<slot />

<style global lang="scss">
	@import '../theme/global.scss';
	@import '../theme/variables.scss';
</style>

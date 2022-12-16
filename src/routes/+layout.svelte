<script>
	import '../theme/tailwind.css';
	import { Toaster } from 'svelte-french-toast';
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<Toaster />

<!--Page content-->
<Navbar />
<slot />

<style global lang="scss">
	@import '../theme/global.scss';
	@import '../theme/variables.scss';
</style>

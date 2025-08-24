<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import Search from '$lib/components/Search.svelte';
	import Logo from '$lib/components/Logo.svelte';

	let activeElement;

	onMount(() => {
		activeElement =
			$page.url.pathname == '/'
				? document.getElementById('home')
				: document.getElementById($page.url.pathname.replace('/', ''));

		if (!activeElement) return;

		activeElement.classList.add('active');
	});

	const toggleActive = (id) => {
		let element = document.getElementById(id);
		if (element == activeElement) return;
		if (activeElement) activeElement.classList.remove('active');
		activeElement = element;
		activeElement.classList.add('active');
	};
</script>

<nav class="container">
	<div class="navigation">
		<div class="tw-flex tw-items-center">
			<a href="/" id="home" class="tw-mr-10" aria-label="home" on:click={() => toggleActive('home')}
				><Logo /></a
			>
			<a
				href="/nodes"
				data-sveltekit-prefetch
				id="nodes"
				aria-label="nodes"
				on:click={() => toggleActive('nodes')}
			>
				<i class="fa-solid fa-server tw-mr-2 tw-ml-2" aria-hidden="true" />
			</a>
			<a
				href="https://miningpoolstats.stream/kryptokrona"
				data-sveltekit-prefetch
				id="pools"
				aria-label="pools"
				target="_blank">
				<i class="fa-solid fa-water-ladder tw-mr-2 tw-ml-2" aria-hidden="true" />
			</a>
		</div>

		<Search />
	</div>
</nav>

<style lang="scss">
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;

		a {
			display: flex;
			justify-content: center;
			align-items: center;
			text-decoration: none;
			opacity: 0.6;
		}
		a:hover {
			opacity: 1;
		}
	}
	.navigation {
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		margin: 1rem;
	}
</style>

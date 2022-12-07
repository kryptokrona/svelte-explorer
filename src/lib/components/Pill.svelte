<script>
	export let text = 'Undefined';
	export let fill = false;
</script>

<div class="pill {fill ? 'fill' : ''}">
	<p>{text}</p>
</div>

<style lang="scss">
	.pill {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 0.8rem;
		border: 1px solid var(--text-color);
		padding: 3px 8px 3px 8px;
		border-radius: 50px;
	}
	.fill {
		border: none;
		background-color: var(--pill-background-color);
	}
</style>

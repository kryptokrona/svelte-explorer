<script>
	export let text = 'Undefined';
	export let color;
</script>

<p class="pill {color ? 'fill ' + color : ''}">{text}</p>

<style lang="scss">
	.pill {
		height: min-content;
		font-size: 0.8rem;
		border: 1px solid var(--text-color);
		padding: 3px 8px 3px 8px;
		border-radius: 50px;
	}
	.fill {
		border: none;
	}
	.green {
		background-color: var(--green);
	}
	.red {
		background-color: var(--red);
	}
	.gray {
		background-color: var(--pill-background-color);
	}
</style>

<script>
	export let percentage = 0;
	export let color = 'purple';
</script>

<div class="progress-container ">
	<div class={'bar ' + color} style="width: {percentage}%;}">
		<p>{percentage + '%'}</p>
	</div>
</div>

<style>
	.progress-container {
		border-radius: 8px;
		background-color: var(--table-header-background);
		width: 100%;
	}
	.bar {
		font-size: 0.8em;
		border-radius: 8px;
		text-align: left;
	}
	.bar p {
		padding: 2px 5px;
	}
	.pink {
		background: linear-gradient(var(--pink), transparent);
	}
	.purple {
		background: linear-gradient(var(--purple), transparent);
	}
	.lime-green {
		background: linear-gradient(var(--lime-green), transparent);
	}
</style>

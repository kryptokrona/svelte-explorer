<script>
    import {explorerData} from "$lib/stores/data.js";
    import {calcTime} from "$lib/utils/index.js";
    import {onMount} from "svelte";
    import {prettifyHashrate} from "$lib/utils";

    let time

    const getTime = () => {
        let currentTime = Date.now();
        let ms = currentTime - $explorerData.block.timestamp * 1000;
        time = calcTime(ms)
        setInterval(() => {
            currentTime = Date.now();
            ms = currentTime - $explorerData.block.timestamp * 1000;
            time = calcTime(ms)
        }, 1000)
    }

    onMount(() => {
        getTime()
    })

</script>

<div class="grid container">
    <div class="card">
        <h2>Height</h2>
        <p>{$explorerData.node.height}</p>
    </div>
    <div class="card">
        <h2>Hashrate</h2>
        <p>{prettifyHashrate($explorerData.node.hashrate, 2)}</p>
    </div>
    <div class="card">
        <h2>Difficulty</h2>
        <p>{(($explorerData.node.difficulty / 1000000).toFixed(2))} M</p>
    </div>
    <div class="card">
        <h2>Last block</h2>
        <p>{time} ago</p>
    </div>
</div>

<style lang="scss">

  .grid {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    grid-gap: 10px;
    margin: 2rem auto;
  }

  .card {
    grid-column: span 3 / span 3;
  }

  @media screen and (max-width: 768px) {
    .card {
      grid-column: span 6 / span 6;
    }
  }

  @media screen and (max-width: 568px) {
    .card {
      grid-column: span 12 / span 12;
    }
  }
</style>
<script>
    import {explorerData} from "$lib/stores/data";
    import {fade} from 'svelte/transition'
    import { Moon } from 'svelte-loading-spinners'
    import Time from "svelte-time";
</script>

<div class="container wrapper">
    <div class="block">
        <h4>{$explorerData.node.height}</h4>
        <Moon color="var(--title-color)" size="30"/>
        <div></div>
    </div>
    {#each $explorerData.blocks.slice(0,6) ?? [] as block, i}
        <div in:fade|local class="block">
            <h4>{block.height}</h4>
            <p>{block.num_txes} txs</p>
            <p>{(block.reward / 100000).toFixed(2)}</p>
            <p class="time"><Time relative timestamp={block.timestamp * 1000}/></p>
        </div>
    {/each}
</div>

<style lang="scss">

  .wrapper {
    margin-top: 2rem;
    display: flex;
    grid-gap: 10px;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    transition: 150ms ease-in-out;
    overflow: scroll;

    &::-webkit-scrollbar {
      display: none;
    }
  }

    .block {
      display: flex;
      padding: 1rem;
      justify-content: space-between;
      min-width: 128.5px;
      height: 128.5px;
      flex-direction: column;
      align-items: center;
      border: var(--card-border);
      background-color: var(--card-background);
      border-radius: 5px;
      grid-column: span 2 / span 2;

      p {
        font-size: 0.75rem;
      }

      .time {
        font-size: 0.6rem;
        opacity: 50%;
      }
    }
</style>
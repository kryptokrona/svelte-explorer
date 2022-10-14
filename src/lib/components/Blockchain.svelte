<script>
    import {explorerData} from "$lib/stores/data";
    import {fade} from 'svelte/transition'
    import { Moon } from 'svelte-loading-spinners'
</script>

<div class="container wrapper">
    <div class="block">
        <Moon color="var(--title-color)" size="30"/>
    </div>
    {#each $explorerData.blocks.slice(0,6) ?? [] as block, i}
        <div in:fade|local class="block">
            <p>{block.height}</p>
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
      min-width: 128.5px;
      height: 128.5px;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: var(--card-border);
      background-color: var(--card-background);
      border-radius: 5px;
      grid-column: span 2 / span 2;
    }
</style>
<script>
    import {explorerData} from "$lib/stores/data";
    import {flip} from 'svelte/animate'
    import {Moon} from 'svelte-loading-spinners'
    import Time from "svelte-time";
    import {goto} from "$app/navigation";
    import {quadInOut} from "svelte/easing";
</script>

<div class="wrapper">
    {#key $explorerData.node.height}
        <div class="block transparent" class:blink_me={$explorerData.newBlock}>
            <div></div>
            <Moon color="var(--title-color)" size="30"/>
            <div></div>
        </div>
    {/key}
    {#each $explorerData.blocks.slice(0, 6) ?? [] as block (block.hash)}
        <div animate:flip={{duration: 250, easing: quadInOut}} class="block clickable"
             on:click={() => goto(`/block/${block.hash}`)}>
            <h4>{block.height}</h4>
            <p>{block.num_txes} txs</p>
            <p>{(block.reward / 100000).toFixed(2)}</p>
            <p class="time">
                <Time relative timestamp={block.timestamp * 1000}/>
            </p>
        </div>
    {/each}
</div>

<style lang="scss">

  .wrapper {
    display: flex;
    margin-left: auto;
    gap: 10px;
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
      font-size: 0.55rem;
      opacity: 50%;
      text-align: center;
    }
  }

  .transparent {
    background-color: transparent;
  }

  .clickable {
    transition: 150ms ease-in-out;
    cursor: pointer;

    &:hover {
      background-color: var(--table-row-hover);
    }
  }
</style>
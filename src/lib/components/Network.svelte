<script>
    import {explorerData} from "$lib/stores/data.js";
</script>

<div class="grid container">
    <div class="card">
        <h2>Hashrate</h2>
        <p>{$explorerData.node.hashrate}</p>
    </div>
    <div class="card">
        <h2>Hashrate</h2>
    </div>
    <div class="card">
        <h2>Hashrate</h2>
    </div>
    <div class="card">
        <h2>Hashrate</h2>
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

  @media screen and (max-width: 768px){
    .card {
      grid-column: span 6 / span 6;
    }
  }

  @media screen and (max-width: 568px){
    .card {
      grid-column: span 12 / span 12;
    }
  }
</style>
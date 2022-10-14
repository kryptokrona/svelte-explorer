<script>

    export let data = []

</script>

<div class="container">
    <div class="title">
        <h2>Block {data.height}</h2>
    </div>
    <div class="wrapper layered-shadow">
        <div class="table-header">
            <div class="table-row">
                <div><h4>Hash: {data.hash.substring(0, 6) + ".." + data.hash.substring(58, data.hash.length)}</h4></div>
            </div>
        </div>
        <div class="table-body">
            <div class="table-row">
                <div class="table-cell">
                    <p>Difficulty</p>
                </div>
                <div class="table-cell end">
                    <p>{data.difficulty}</p>
                </div>
            </div>
            <div class="line"></div>
            <div class="table-row">
                <div class="table-cell">
                    <p>Difficulty</p>
                </div>
                <div class="table-cell end">
                    <p>{data.difficulty}</p>
                </div>
            </div>
            <div class="line"></div>
            <div class="table-row">
                <div class="table-cell">
                    <p>Difficulty</p>
                </div>
                <div class="table-cell end">
                    <p>{data.difficulty}</p>
                </div>
            </div>
            <div class="line"></div>
            <div class="table-row">
                <div class="table-cell">
                    <p>Difficulty</p>
                </div>
                <div class="table-cell end">
                    <p>{data.difficulty}</p>
                </div>
            </div>
            <div class="line"></div>
            <div class="table-row">
                <div class="table-cell">
                    <p>Difficulty</p>
                </div>
                <div class="table-cell end">
                    <p>{data.difficulty}</p>
                </div>
            </div>
            <div class="line"></div>
            <div class="table-row">
                <div class="table-cell">
                    <p>Difficulty</p>
                </div>
                <div class="table-cell end">
                    <p>{data.difficulty}</p>
                </div>
            </div>
        </div>
    </div>
</div>

<style lang="scss">

  .wrapper {
    border: 1px solid var(--table-border-color);
    border-radius: 5px
  }

  .title {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    margin: 1rem;
  }

  .table-header {
    background-color: var(--table-header-background);
    border-radius: 5px 5px 0 0;
  }

  .table-row {
    display: flex;
    justify-content: space-between;
    padding: 10px 1.5rem;
  }

  .table-cell {
    width: 120px;
  }

  .table-body {
    background-color: var(--table-body-background);
    overflow: scroll;
    border-radius: 0 0 5px 5px;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .end {
    text-align: end;
  }

  @media screen and (max-width: 568px) {
    .hide {
      display: none;
    }
  }
</style>
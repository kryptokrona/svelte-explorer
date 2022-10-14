<script>
    import Search from "$lib/components/Search.svelte";

</script>

<nav class="container">
    <div class="navigation">
        <a href="/"><h1>Explorer</h1></a>
        <Search/>
    </div>
</nav>

<style lang="scss">

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
      text-decoration: none;
    }
  }

  .navigation {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin: 1rem 1rem;
  }
</style>
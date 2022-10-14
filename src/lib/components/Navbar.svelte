<script>
    import Search from "$lib/components/Search.svelte";

</script>

<nav class="container">
    <a href="/"><h1>Explorer</h1></a>
    <div>
        <Search/>
    </div>
</nav>

<style lang="scss">
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
      margin: 1rem;
      text-decoration: none;
    }
  }
</style>
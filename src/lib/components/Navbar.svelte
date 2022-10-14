<script>
    import Search from "$lib/components/Search.svelte";
    import Logo from "$lib/components/Logo.svelte";

</script>

<nav class="container">
    <div class="navigation">
        <a href="/"><Logo/></a>
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
    margin: 1rem;
  }
</style>
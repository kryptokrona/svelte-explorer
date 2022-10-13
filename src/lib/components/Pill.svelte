<script>
    export let text = 'Undefined'
</script>

<div class="pill">
    <p>{text}</p>
</div>

<style lang="scss">
  .pill {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;
    border: 1px solid var(--text-color);
    padding: 3px;
    min-width: 3rem;
    border-radius: 50px;
  }
</style>
<script lang="ts">
  export let show = true;
</script>

<div class:hide={!show}>
  <slot />
</div>

<style lang="scss">
  .hide {
    display: none !important;
  }
</style>

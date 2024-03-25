<script lang="ts">
  import type { PackageDataFormat } from '$lib';
  import PackageViewer from '$lib/components/PackageViewer.svelte';

  export let data: { data: PackageDataFormat[] } = { data: [] };
</script>

<h1>Welcome to SvelteKit</h1>
<PackageViewer data={data.data} />

<style lang="scss">
  h1 {
    font-size: xx-large;
  }
</style>

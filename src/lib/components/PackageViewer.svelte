<script lang="ts">
  import type { PackageDataFormat } from '$lib';
  import PackageData from '$lib/components/PackageData.svelte';

  export let data: PackageDataFormat[];
</script>

<h2>USE PACKAGE LIST</h2>

<details class="details">
  <summary>In-page link</summary>
  <ul>
    {#each data as d (`link_${d.name}`)}
      <li><a href={`#${d.name}`} class="page-link">{d.name}</a></li>
    {/each}
  </ul>
</details>

{#if data.length}
  {#each data as d (`data_${d.name}`)}
    <PackageData data={d} />
  {/each}
{/if}

<style lang="scss">
  .details {
    border-bottom: 1px solid black;
  }

  .page-link {
    color: blue;

    &:hover {
      color: red;
    }
  }
</style>

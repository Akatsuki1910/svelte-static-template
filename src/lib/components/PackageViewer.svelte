<script lang="ts">
  import { onMount } from 'svelte';
  import PackageData from '$lib/components/PackageData.svelte';

  let devDependenciesArr: [string, string][] = [];

  onMount(async () => {
    const f = await fetch('$lib/components/package.json');
    const devDependenciesData = ((await f.json()) as Record<string, unknown>)
      .devDependencies as Record<string, string>;
    devDependenciesArr = Object.entries(devDependenciesData);
  });
</script>

<h2>USE PACKAGE LIST</h2>

<details class="details">
  <summary>In-page link</summary>
  <ul>
    {#each devDependenciesArr as data (`link_${data[0]}`)}
      <li><a href={`#${data[0]}`} class="page-link">{data[0]}</a></li>
    {/each}
  </ul>
</details>

{#if devDependenciesArr.length}
  {#each devDependenciesArr as data (`data_${data[0]}`)}
    <PackageData packageData={data} />
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

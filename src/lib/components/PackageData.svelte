<script lang="ts">
  export let data: PackageDataFormat;
  import type { PackageDataFormat } from '$lib';

  const getDate = (date: string) =>
    new Date(date).toLocaleString('ja-JP', {
      hour12: false,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

  let isHiddenAlpha = true;
</script>

<section class="section">
  <h2 id={data.name}>{data.name}</h2>
  <a href={`${data.repository}`} class="repository-link" target="_blank" rel="noopener noreferrer">
    {data.repository}
  </a>
  <table>
    <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col">Version</th>
        <th scope="col">Time</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="col">Package Latest</th>
        <td
          class={data.version.latest.v === data.version.now.v
            ? 'version-color-some'
            : 'version-color-latest'}>{data.version.latest.v}</td
        >
        <td>{getDate(data.version.latest.time)}</td>
      </tr>
      <tr>
        <th scope="col">Now Version</th>
        <td
          class={data.version.latest.v === data.version.now.v
            ? 'version-color-some'
            : 'version-color-now'}>{data.version.now.v}</td
        >
        <td>{getDate(data.version.now.time)}</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th scope="row" colspan="2">Delay Day</th>
        <td>{data.version.diff === 0 ? 'This is latest' : data.version.diff}</td>
      </tr>
    </tfoot>
  </table>
  <details>
    <summary>Versions</summary>
    <label class="label">
      <input type="checkbox" bind:checked={isHiddenAlpha} class="checkbox" />
      Hidden Alpha
    </label>
    <table>
      <thead>
        <tr>
          <th scope="col">Version</th>
          <th scope="col">Published</th>
        </tr>
      </thead>
      <tbody>
        {#each Object.entries(data.times).reverse() as timesData (timesData[0])}
          {#if !(isHiddenAlpha && timesData[0].includes('-'))}
            <tr>
              <td
                class={data.version.latest.v === data.version.now.v &&
                data.version.latest.v === timesData[0]
                  ? 'version-color-some'
                  : data.version.latest.v === timesData[0]
                    ? 'version-color-latest'
                    : data.version.now.v === timesData[0]
                      ? 'version-color-now'
                      : undefined}>{timesData[0]}</td
              >
              <td>{getDate(timesData[1])}</td>
            </tr>
          {/if}
        {/each}
      </tbody>
    </table>
  </details>
</section>

<style lang="scss">
  .version-color {
    &-now {
      font-weight: bold;
      color: red;
    }

    &-latest {
      font-weight: bold;
      color: green;
    }

    &-some {
      font-weight: bold;
      color: purple;
    }
  }

  .section {
    border-bottom: 1px solid black;
  }

  .repository-link {
    color: blue;

    &:hover {
      color: red;
    }
  }

  .label {
    cursor: pointer;
  }

  .checkbox {
    position: relative;
    width: 1em;
    height: 1em;
    border: 1px solid black;

    &::after {
      display: none;
    }

    &:checked {
      &::after {
        position: absolute;
        top: 50%;
        left: 50%;
        display: block;
        width: 0.5em;
        height: 0.5em;
        content: '';
        background-color: black;
        border-radius: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
</style>

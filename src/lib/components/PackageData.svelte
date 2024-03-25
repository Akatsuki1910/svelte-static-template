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
        <td>{data.version.latest.v}</td>
        <td>{getDate(data.version.latest.time)}</td>
      </tr>
      <tr>
        <th scope="col">Now Version</th>
        <td>{data.version.now.v}</td>
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
    <table>
      <thead>
        <tr>
          <th scope="col">Version</th>
          <th scope="col">Published</th>
        </tr>
      </thead>
      <tbody>
        {#each Object.entries(data.times).reverse() as timesData (timesData[0])}
          <tr>
            <td>{timesData[0]}</td>
            <td>{getDate(timesData[1])}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </details>
</section>

<style lang="scss">
  .section {
    border-bottom: 1px solid #000;
  }

  .repository-link {
    color: blue;

    &:hover {
      color: red;
    }
  }
</style>

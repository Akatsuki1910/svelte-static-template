<script lang="ts">
  export let packageData: [string, string];

  interface PackageData {
    name: string;
    version: {
      now: { v: string; time: string };
      latest: { v: string; time: string };
      diff: number;
    };
    repository: string;
    times: Record<string, string>;
  }

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

  const diffDay = (date1: string, date2: string) =>
    Math.floor(
      Math.abs(new Date(date1).getTime() - new Date(date2).getTime()) / 24 / 60 / 60 / 1000
    );

  const fetchItems = async () => {
    const f = await fetch(`https://registry.npmjs.org/${packageData[0]}`);
    const npmData = (await f.json()) as Record<string, unknown>;

    const data: PackageData = {
      name: npmData.name as string,
      version: {
        now: { v: packageData[1].replaceAll('^', ''), time: '' },
        latest: { v: (npmData['dist-tags'] as Record<string, string>).latest, time: '' },
        diff: 0
      },
      repository: (npmData.repository as Record<string, string>).url
        .replaceAll(/^git\+/g, '')
        .replaceAll(/\.git$/g, ''),
      times: npmData.time as Record<string, string>
    };

    data.version.now.time = data.times[data.version.now.v];
    data.version.latest.time = data.times[data.version.latest.v];
    data.version.diff = diffDay(data.version.latest.time, data.version.now.time);

    return data;
  };
</script>

{#await fetchItems() then data}
  <section class="section">
    <h2 id={data.name}>{data.name}</h2>
    <a
      href={`${data.repository}`}
      class="repository-link"
      target="_blank"
      rel="noopener noreferrer"
    >
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
{/await}

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

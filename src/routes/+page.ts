import type { PackageDataFormat } from '$lib';
import devDependenciesData from '$lib/components/package.json';

const diffDay = (date1: string, date2: string) =>
  Math.floor(Math.abs(new Date(date1).getTime() - new Date(date2).getTime()) / 24 / 60 / 60 / 1000);

/** @type {import('./$types').PageLoad} */
export async function load() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
  const devDependenciesArr = Object.entries(devDependenciesData.devDependencies);

  const loadPackageData = async (d: (typeof devDependenciesArr)[number]) => {
    const f = await fetch(`https://registry.npmjs.org/${d[0]}`);
    const npmData = (await f.json()) as Record<string, unknown>;

    const data: PackageDataFormat = {
      name: npmData.name as string,
      version: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        now: { v: d[1].replaceAll('^', ''), time: '' },
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

  const formatData = await Promise.all(devDependenciesArr.map((v) => loadPackageData(v)));

  return { data: formatData };
}

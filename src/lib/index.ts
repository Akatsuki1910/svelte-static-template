export interface PackageDataFormat {
  name: string;
  version: {
    now: { v: string; time: string };
    latest: { v: string; time: string };
    diff: number;
  };
  repository: string;
  times: Record<string, string>;
}

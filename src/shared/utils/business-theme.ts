/** Scope tenant accents to business pages; keep legacy/invalid colors on the default palette. */
export function getBusinessTheme(color?: string | null): string | undefined {
  if (!color || !/^#[0-9a-f]{6}$/i.test(color)) return undefined;
  const light = [
    [50, 8],
    [100, 15],
    [200, 30],
    [300, 50],
    [400, 75],
  ];
  const dark = [
    [600, 15],
    [700, 30],
    [800, 45],
    [900, 60],
    [950, 75],
  ];
  return [
    ...light.map(
      ([shade, amount]) =>
        `--color-indigo-${shade}:color-mix(in srgb, ${color} ${amount}%, white)`
    ),
    `--color-indigo-500:${color}`,
    ...dark.map(
      ([shade, amount]) =>
        `--color-indigo-${shade}:color-mix(in srgb, ${color}, black ${amount}%)`
    ),
  ].join(';');
}

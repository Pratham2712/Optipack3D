export function rgbaToHex(rgba) {
  const match = rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([\d.]*)\)$/);
  if (!match) throw new Error("Invalid RGBA format");

  const r = parseInt(match[1], 10);
  const g = parseInt(match[2], 10);
  const b = parseInt(match[3], 10);
  const a = match[4] !== "" ? parseFloat(match[4]) : 1;

  const toHex = (n) => n.toString(16).padStart(2, "0").toUpperCase();

  const rHex = toHex(r);
  const gHex = toHex(g);
  const bHex = toHex(b);
  const aHex = toHex(Math.round(a * 255));

  // Return hex color with or without alpha component
  return `#${rHex}${gHex}${bHex}${a < 1 ? aHex : ""}`;
}

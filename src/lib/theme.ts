// Derives the whole teal-based design system from a single hue, preserving
// the saturation/lightness relationships defined in src/index.css.
const hexToHue = (hex: string): number | null => {
  const match = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!match) return null;

  const r = parseInt(match[1].slice(0, 2), 16) / 255;
  const g = parseInt(match[1].slice(2, 4), 16) / 255;
  const b = parseInt(match[1].slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  if (delta === 0) return 0;

  let hue: number;
  if (max === r) hue = ((g - b) / delta) % 6;
  else if (max === g) hue = (b - r) / delta + 2;
  else hue = (r - g) / delta + 4;

  hue *= 60;
  if (hue < 0) hue += 360;
  return Math.round(hue);
};

export const applyThemeColor = (hex: string) => {
  const hue = hexToHue(hex);
  if (hue === null) return;

  const root = document.documentElement.style;
  root.setProperty("--background", `${hue} 20% 98%`);
  root.setProperty("--primary", `${hue} 65% 45%`);
  root.setProperty("--primary-glow", `${hue} 70% 55%`);
  root.setProperty("--secondary", `${hue} 45% 55%`);
  root.setProperty("--muted", `${hue} 15% 92%`);
  root.setProperty("--accent", `${hue} 75% 35%`);
  root.setProperty("--border", `${hue} 20% 90%`);
  root.setProperty("--input", `${hue} 20% 90%`);
  root.setProperty("--ring", `${hue} 65% 45%`);
  root.setProperty("--warm-beige", `${hue} 15% 88%`);
  root.setProperty("--cream", `${hue} 20% 95%`);
  root.setProperty(
    "--gradient-hero",
    `linear-gradient(135deg, hsl(${hue} 30% 95%) 0%, hsl(${hue} 20% 88%) 30%, hsl(${hue} 65% 75%) 70%, hsl(${hue} 75% 55%) 100%)`
  );
  root.setProperty(
    "--gradient-card",
    `linear-gradient(135deg, hsl(${hue} 20% 95%) 0%, hsl(${hue} 25% 95%) 100%)`
  );
  root.setProperty(
    "--gradient-gold-shimmer",
    `linear-gradient(90deg, hsl(${hue} 65% 45% / 0) 0%, hsl(${hue} 65% 45% / 0.3) 50%, hsl(${hue} 65% 45% / 0) 100%)`
  );
  root.setProperty("--shadow-soft", `0 4px 20px hsl(${hue} 65% 45% / 0.15)`);
  root.setProperty("--shadow-hover", `0 8px 30px hsl(${hue} 65% 45% / 0.25)`);
};

import { camelToKebabCase } from '@dsp/core';
import Color from 'color';
import { useReadableColor } from '@dsp/ui/hooks/useReadableColor';

export class ThemeService {
  constructor(theme) {
    this.theme = theme;
  }

  async setup() {
    await Promise.all([
      this.setupFonts.call(this),
      this.setupVariables.call(this)
    ]);
  }

  setupFonts() {
    return Promise.all(
      Object.entries(this.theme.fonts).flatMap(([name, fonts]) =>
        Object.entries(fonts).map(([weight, url]) =>
          this.loadFont({ name, url, weight: parseInt(weight, 10) })
        )
      )
    );
  }

  setupVariables() {
    const { fonts, palettes, colors } = this.theme;
    Object.keys(fonts).forEach(name => {
      document.documentElement.style.setProperty(
        `--font-${camelToKebabCase(name)}`,
        `Disruptual ${name}`
      );
    });
    Object.entries(palettes).forEach(([name, baseValue]) => {
      this.generateColorScale(baseValue).forEach(([variant, value]) => {
        document.documentElement.style.setProperty(
          `--color-${camelToKebabCase(name)}-${variant}`,
          value
        );
      });
    });

    Object.entries(colors).forEach(([name, value]) => {
      document.documentElement.style.setProperty(
        `--color-${camelToKebabCase(name)}`,
        value
      );
    });

    const bodyTextcolor = useReadableColor('--color-background');
    document.documentElement.style.setProperty(
      '--dsp-ui-body-text-color',
      bodyTextcolor.value
    );
  }

  async loadFont({ name, url, weight }) {
    const fontFace = new FontFace(`Disruptual ${name}`, `url(${url})`, {
      weight,
      display: 'swap'
    });
    document.fonts.add(await fontFace.load());
  }

  generateColorScale(baseColor) {
    return [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
      .map(unit => [
        unit,
        Color(baseColor)
          .lightness(100 - unit / 10)
          .hsl()
          .string()
      ])
      .concat([
        ['half', Color(baseColor).fade(0.5).hsl().string()],
        ['quarter', Color(baseColor).fade(0.75).hsl().string()]
      ]);
  }
}

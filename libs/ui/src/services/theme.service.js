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
    if (import.meta.env.NODE_ENV === 'test') return;

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
      Object.entries(this.generateColorScale(baseValue)).forEach(
        ([variant, value]) => {
          document.documentElement.style.setProperty(
            `--color-${camelToKebabCase(name)}-${variant}`,
            value
          );
        }
      );
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
    const MAX_LUMINOSITY = 95;
    const MIN_LUMINOSITY = 10;
    const LIGHT_VALUES = 5;
    const DARK_VALUES = 4;

    const [, , luminosity] = Color(baseColor).hsl().array();
    const lightStep = (MAX_LUMINOSITY - luminosity) / LIGHT_VALUES;
    const darkStep = (luminosity - MIN_LUMINOSITY) / DARK_VALUES;

    return {
      50: Color(baseColor)
        .lightness(luminosity + 5 * lightStep)
        .hex(),
      100: Color(baseColor)
        .lightness(luminosity + 4 * lightStep)
        .hex(),
      200: Color(baseColor)
        .lightness(luminosity + 3 * lightStep)
        .hex(),
      300: Color(baseColor)
        .lightness(luminosity + 2 * lightStep)
        .hex(),
      400: Color(baseColor)
        .lightness(luminosity + lightStep)
        .hex(),
      500: Color(baseColor).hex(),
      600: Color(baseColor)
        .lightness(luminosity - darkStep)
        .hex(),
      700: Color(baseColor)
        .lightness(luminosity - 2 * darkStep)
        .hex(),
      800: Color(baseColor)
        .lightness(luminosity - 3 * darkStep)
        .hex(),
      900: Color(baseColor)
        .lightness(luminosity - 4 * darkStep)
        .hex(),
      half: Color(baseColor).fade(0.5).hsl().string(),
      quarter: Color(baseColor).fade(0.75).hsl().string()
    };
  }
}

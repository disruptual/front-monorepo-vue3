import { camelToKebabCase } from '@dsp/core';
import { reactive } from 'vue';
import { useReadableColor } from '@dsp/ui/hooks/useReadableColor';
import { createColorScale } from '@dsp/ui/utils/themeUtils';

export class ThemeService {
  constructor(theme) {
    console.log(theme);
    this.theme = reactive(theme);
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
      const options =
        typeof baseValue === 'object'
          ? baseValue
          : {
              baseColor: baseValue
            };
      Object.entries(createColorScale(options)).forEach(([i, value]) => {
        document.documentElement.style.setProperty(
          `--color-${camelToKebabCase(name)}-${Number(i) + 1}00`,
          value
        );
      });
    });

    Object.entries(colors).forEach(([name, value]) => {
      document.documentElement.style.setProperty(
        `--color-${camelToKebabCase(name)}`,
        `var(--color-${value})`
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

  createColorScale(baseColor) {
    return createColorScale(baseColor);
  }
}

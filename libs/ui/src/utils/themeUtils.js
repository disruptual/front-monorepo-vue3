import chroma from 'chroma-js';

const getContrastPassingColor = () => {
  const blackMinLuminance = 4.5 * (chroma('black').luminance() + 0.05);
  const whiteMinLuminance = (chroma('white').luminance() + 0.05) / 4.5;

  return (blackMinLuminance + whiteMinLuminance) / 2 - 0.05;
};

export const createColorScale = ({
  baseColor,
  hueShift = 0,
  minLightness = 0.2,
  maxLightness = 0.95,
  saturationAdjust = 0,
  lightnessAdjust = 0
}) => {
  const middleColor = chroma(baseColor).luminance(getContrastPassingColor());

  const lightestColor = chroma(middleColor)
    .set('hsl.h', `-${hueShift / 2}`)
    .set('hsl.l', maxLightness);

  const darkestColor = chroma(middleColor)
    .set('hsl.h', `+${hueShift / 2}`)
    .set('hsl.l', minLightness);

  const palette = chroma
    .scale([lightestColor, middleColor, darkestColor])
    .colors(9)
    .map(hex => {
      const color = chroma(hex);

      const s = Number(color.get('hsl.s'));
      const normalizedSaturationAdjust =
        s + Number(saturationAdjust) < 0 ? s * -1 : saturationAdjust;

      return color
        .set(
          'hsl.s',
          `${
            normalizedSaturationAdjust >= 0 ? '+' : ''
          }${normalizedSaturationAdjust}`
        )
        .set('hsl.l', `${lightnessAdjust >= 0 ? '+' : ''}${lightnessAdjust}`)
        .hex();
    });

  palette.half = chroma(palette[4]).alpha(0.5).css();
  palette.quarter = chroma(palette[4]).alpha(0.25).css();

  return palette;
};

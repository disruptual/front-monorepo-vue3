import { Color } from './Color.model';

describe('ColorModel', () => {
  it('should return correct hex code', () => {
    const color = new Color({
      hex: '123456'
    });

    expect(color.hexCode).toBe('#123456');
  });
});

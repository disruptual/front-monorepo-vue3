import { mount } from '@vue/test-utils';
import DspImage from './index.vue';

const defaultSrc = 'testSRC';

describe('DspImage', () => {
  it('should render without throwing', () => {
    expect(() => mount(DspImage)).not.toThrow();
  });

  describe('props', () => {
    it('should render a placeholder image', () => {
      const wrapper = mount(DspImage);

      const image = wrapper.find('img');

      expect(image.exists()).toBe(false);

      const placeholder = wrapper.find('.dsp-image__placeholder');

      expect(placeholder.exists()).toBe(true);
    });

    it('should render with the right URL', () => {
      const wrapper = mount(DspImage, { props: { src: defaultSrc } });

      expect(wrapper.attributes('src')).toBe(defaultSrc);
    });
  });
});

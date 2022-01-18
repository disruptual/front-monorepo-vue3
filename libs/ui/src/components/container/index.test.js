import { mount } from '@vue/test-utils';
import DspContainer from './index.vue';

describe('DspContainer', () => {
  it('should render without throwing', () => {
    expect(() => mount(DspContainer)).not.toThrow();
  });

  it('should render slot', () => {
    const textSlot = 'Text example slot';
    const wrapper = mount(DspContainer, {
      slots: { default: textSlot }
    });

    expect(wrapper.text()).toContain(textSlot);
  });

  describe('props', () => {
    it('should render a small container', () => {
      const wrapper = mount(DspContainer, { props: { isSmall: true } });

      const classes = wrapper.classes();

      expect(classes).toContain('dsp-container--is-small');
    });

    it('should render a large container', () => {
      const wrapper = mount(DspContainer, { props: { isLarge: true } });

      const classes = wrapper.classes();

      expect(classes).toContain('dsp-container--is-large');
    });

    it('should render a paragraph html tag', () => {
      const wrapper = mount(DspContainer, { props: { as: 'p' } });

      const paragraph = wrapper.find('p');

      expect(paragraph.exists()).toBe(true);
    });

    it('should render a div html tag', () => {
      const wrapper = mount(DspContainer);

      const div = wrapper.find('div');

      expect(div.exists()).toBe(true);
    });
  });
});

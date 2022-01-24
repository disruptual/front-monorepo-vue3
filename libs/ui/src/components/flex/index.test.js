import { mount } from '@vue/test-utils';
import DspFlex from './index.vue';

describe('DspFlex', () => {
  it('should render correctly', () => {
    const wrapper = mount(DspFlex);

    expect(wrapper.find('.dsp-flex')).toBeDefined();
  });

  it('should render slot', () => {
    const textSlot = 'Text example';

    const wrapper = mount(DspFlex, {
      slots: { default: textSlot }
    });

    expect(wrapper.text()).toContain(textSlot);
  });

  describe('props', () => {
    it('should render a div', () => {
      const wrapper = mount(DspFlex);
      expect(wrapper.element.tagName).toEqual('DIV');
    });
    it('should render a span', () => {
      const wrapper = mount(DspFlex, { props: { as: 'span' } });
      expect(wrapper.element.tagName).toEqual('SPAN');
    });
  });
});

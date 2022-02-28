import { mount } from '@vue/test-utils';
import DspGrid from './index.vue';

describe('DspGrid', () => {
  it('should render correctly', () => {
    const wrapper = mount(DspGrid, { props: { columns: 2 } });

    expect(wrapper.find('.dsp-grid')).toBeDefined();
  });

  it('should render slot', () => {
    const textSlot = 'Text example';

    const wrapper = mount(DspGrid, {
      props: { columns: 2 },
      slots: { default: textSlot }
    });

    expect(wrapper.text()).toContain(textSlot);
  });

  describe('props', () => {
    it('should render a div', () => {
      const wrapper = mount(DspGrid, { props: { columns: 2 } });
      expect(wrapper.element.tagName).toEqual('DIV');
    });
    it('should render a span', () => {
      const wrapper = mount(DspGrid, { props: { as: 'span', columns: 2 } });
      expect(wrapper.element.tagName).toEqual('SPAN');
    });
  });
});

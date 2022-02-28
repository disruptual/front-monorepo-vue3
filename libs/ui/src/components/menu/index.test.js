import { mount } from '@vue/test-utils';
import DspMenu from './index.vue';

describe('DspMenu', () => {
  it('should render without throwing', () => {
    expect(() => mount(DspMenu, { props: { items: [] } })).not.toThrow();
  });

  it('should render slot', () => {
    const testLabel = { tab: { label: 'testLabel' } };
    const array = [testLabel, testLabel];
    const textSlot = 'Text example';

    const wrapper = mount(DspMenu, {
      props: { items: array },
      slots: { default: textSlot }
    });

    expect(wrapper.html()).toContain(textSlot);
  });

  describe('props', () => {
    it('should render right numbers of items depending on an array of items props', async () => {
      const testLabel = { tab: { label: 'testLabel' } };
      const array = [testLabel, testLabel];
      const wrapper = mount(DspMenu, {
        props: { items: array },
        slots: { default: 'test' }
      });

      const childs = wrapper.findAll('li.dsp-swiper-item');

      expect(childs).toHaveLength(2);

      await wrapper.setProps({ items: [...array, ...array] });

      const updatedChilds = wrapper.findAll('li.dsp-swiper-item');

      expect(updatedChilds).toHaveLength(4);
    });
  });
});

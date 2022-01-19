import { mount } from '@vue/test-utils';
import DspInfiniteScroll from './index.vue';

describe('DspInfiniteScroll', () => {
  it('should render without throwing', () => {
    expect(() => mount(DspInfiniteScroll)).not.toThrow();
  });

  it('should render slot', () => {
    const textSlot = 'Text example';

    const wrapper = mount(DspInfiniteScroll, {
      slots: { default: textSlot }
    });

    expect(wrapper.text()).toContain(textSlot);
  });
});

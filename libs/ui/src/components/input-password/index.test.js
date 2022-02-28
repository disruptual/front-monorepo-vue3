import { mount } from '@vue/test-utils';
import DspInputPassword from './index.vue';

describe('DspInputPassword', () => {
  it('should render without throwing', () => {
    expect(() => mount(DspInputPassword)).not.toThrow();
  });
  describe('emit', () => {
    it('should emit a click', async () => {
      const wrapper = mount(DspInputPassword);

      await wrapper.find('button').trigger('click');

      expect(wrapper.emitted()).toHaveProperty('click');
    });
  });
});

import { mount } from '@vue/test-utils';
import DspLoadingButton from './index.vue';

describe('DspLoadingButton', () => {
  it('should render without throwing', () => {
    expect(() =>
      mount(DspLoadingButton, { props: { isLoading: false } })
    ).not.toThrow();
  });

  describe('props', () => {
    it('should render a button disabled', async () => {
      const wrapper = mount(DspLoadingButton, {
        shallow: true,
        props: { isLoading: true }
      });

      await wrapper.trigger('click');

      expect(wrapper.attributes('disabled')).toBe('true');
    });
  });
});

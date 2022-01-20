import { mount } from '@vue/test-utils';
import DspLoader from './index.vue';

describe('DspLoader', () => {
  it('should render without throwing', () => {
    expect(() => mount(DspLoader)).not.toThrow();
  });

  it('should render an icon loader', async () => {
    const wrapper = mount(DspLoader);

    expect(wrapper.find('.dsp-icon').classes()).toEqual([
      'dsp-icon',
      'dsp-loader'
    ]);
  });
});

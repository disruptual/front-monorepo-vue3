import { mount } from '@vue/test-utils';
import DspInputFile from './index.vue';

describe('DspInputFile', () => {
  it('should render without throwing', () => {
    expect(() => mount(DspInputFile)).not.toThrow();
  });
});

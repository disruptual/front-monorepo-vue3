import { mount } from '@vue/test-utils';
import DspIconButton from './index.vue';

const defaultIcon = 'info';

describe('DspIconButton', () => {
  it('should render without throwing', () => {
    expect(() =>
      mount(DspIconButton, {
        props: { icon: defaultIcon }
      })
    ).not.toThrow();
  });

  describe('emit', () => {});

  describe('props', () => {});
});

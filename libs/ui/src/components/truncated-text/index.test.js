import { mount } from '@vue/test-utils';
import TruncatedText from './index.vue';
import { createStore } from 'vuex';

const store = createStore({
  state() {
    return { appContext: {} };
  },
  getters: {
    appContext(state) {
      return state.appContext;
    },
    componentContext: state => name => {
      return state.appContext[name];
    }
  }
});

const setup = ({ props, slots } = {}) => {
  const wrapper = mount(TruncatedText, {
    props,
    slots,
    global: {
      provide: { store }
    }
  });

  return { wrapper };
};

describe('DspSurface', () => {
  it('should render correctly', () => {
    const { wrapper } = setup();

    expect(wrapper.find('.dsp-truncated-text')).toBeDefined();
  });

  it('should render slot', () => {
    const { wrapper } = setup({ slots: { default: 'Test Slot' } });

    expect(wrapper.find('.dsp-truncated-text').text()).toContain('Test Slot');
  });
});

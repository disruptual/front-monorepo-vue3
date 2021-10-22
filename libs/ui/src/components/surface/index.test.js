import { mount } from '@vue/test-utils';
import Surface from './index.vue';
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
  const wrapper = mount(Surface, {
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

    expect(wrapper.find('.dsp-surface')).toBeDefined();
  });

  it('should have rounded corners', () => {
    const { wrapper } = setup({ props: { isRounded: true } });

    const classes = wrapper.find('.dsp-surface').classes();

    expect(classes).toContain('dsp-surface--is-rounded');
  });

  it('should render slot', () => {
    const { wrapper } = setup({ slots: { default: 'Test Slot' } });

    expect(wrapper.find('.dsp-surface').text()).toContain('Test Slot');
  });
});

import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router'
import DspPlainButton from './index.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: []
})

const setup = ({ props, slots } = {}) => {
  const wrapper = mount(DspPlainButton, {
    props,
    slots,
    global: {
      provide: {
        APP_CONTEXT: {},
        plugins: [router],
      }
    }
  });

  return { wrapper };
};

describe('DspPlainButton', () => {
  it('should render correctly', () => {
    const { wrapper } = setup();

    expect(wrapper.find('.dsp-plain-button')).toBeDefined();
  });

  it('should render slot', () => {
    const { wrapper } = setup({ slots: { default: 'Test Slot' } });

    expect(wrapper.find('.dsp-plain-button').text()).toContain('Test Slot');
  });
  it('should render balise <a/>', () => {
    const { wrapper } = setup({props: {to: {}},
    })
    const link = wrapper.find('a')
    expect(link).toBeDefined();
  })
});

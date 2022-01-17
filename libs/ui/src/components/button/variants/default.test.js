import { mountComponent } from '@dsp/test-utils';
import DspButton from './default.variant.vue';

describe('DspButtonDefault', () => {
  it('should render correctly', () => {
    const wrapper = mountComponent(DspButton);

    expect(wrapper.find('.dsp-button')).toBeDefined();
  });

  it('should render slot', () => {
    const wrapper = mountComponent(DspButton, {
      slots: { default: 'Test Slot' }
    });

    expect(wrapper.find('.dsp-button').text()).toContain('Test Slot');
  });

  it('should emit click event when the button is clicked', () => {
    const wrapper = mountComponent(DspButton);

    wrapper.find('button').trigger('click');

    expect(wrapper.emitted()).toHaveProperty('click');
  });

  it('should render a rounded button', () => {
    const wrapper = mountComponent(DspButton, { props: { isRounded: true } });

    const classes = wrapper.find('.dsp-button').classes();

    expect(classes).toContain('dsp-button--is-rounded');
  });

  it('should render a full width button', () => {
    const wrapper = mountComponent(DspButton, { props: { isFullWidth: true } });

    const classes = wrapper.find('.dsp-button').classes();

    expect(classes).toContain('dsp-button--is-fullwidth');
  });

  it('should render an outlined button', () => {
    const wrapper = mountComponent(DspButton, { props: { isOutlined: true } });

    const classes = wrapper.find('.dsp-button').classes();

    expect(classes).toContain('dsp-button--is-outlined');
  });

  it('should render an icon to the left side', () => {
    const wrapper = mountComponent(DspButton, { props: { leftIcon: 'add' } });

    expect(wrapper.find('.left-icon')).toBeDefined();
  });

  it('should render an icon to the right side', () => {
    const wrapper = mountComponent(DspButton, { props: { rightIcon: 'add' } });

    expect(wrapper.find('.right-icon')).toBeDefined();
  });
});

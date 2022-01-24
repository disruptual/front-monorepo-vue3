import { mount } from '@vue/test-utils';
import DspButton from './default.variant.vue';

describe('DspButtonDefault', () => {
  it('should render without throwing', () => {
    expect(() => mount(DspButton)).not.toThrow();
  });

  it('should render slot', () => {
    const text = 'Text Slot';
    const wrapper = mount(DspButton, {
      slots: { default: text }
    });
    const button = wrapper.find('.dsp-button');

    expect(button.text()).toContain(text);
  });

  it('should emit click event when the button is clicked', () => {
    const wrapper = mount(DspButton);

    wrapper.find('button').trigger('click');

    expect(wrapper.emitted()).toHaveProperty('click');
  });

  it('should render a rounded button', () => {
    const wrapper = mount(DspButton, { props: { isRounded: false } });

    const classes = wrapper.find('.dsp-button').classes();

    expect(classes).toContain('dsp-button--is-rounded');
  });

  it('should render a full width button', () => {
    const wrapper = mount(DspButton, { props: { isFullWidth: true } });

    const classes = wrapper.find('.dsp-button').classes();

    expect(classes).toContain('dsp-button--is-fullwidth');
  });

  it('should render an outlined button', () => {
    const wrapper = mount(DspButton, { props: { isOutlined: true } });

    const classes = wrapper.find('.dsp-button').classes();

    expect(classes).toContain('dsp-button--is-outlined');
  });

  it('should render an icon to the left side', () => {
    const wrapper = mount(DspButton, { props: { leftIcon: 'add' } });

    expect(wrapper.find('.left-icon')).toBeDefined();
  });

  it('should render an icon to the right side', () => {
    const wrapper = mount(DspButton, { props: { rightIcon: 'add' } });

    expect(wrapper.find('.right-icon')).toBeDefined();
  });
});

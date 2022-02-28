import { mount } from '@vue/test-utils';
import DspButton from './default.variant.vue';

describe('DspButtonDefault', () => {
  it('should render without throwing', () => {
    expect(() => mount(DspButton)).not.toThrow();
  });

  it('should render correctly', () => {
    expect(mount(DspButton).html()).toMatchSnapshot();
  });

  describe('props', () => {
    it('should render the correct color scheme', () => {
      const { vm } = mount(DspButton, {
        props: {
          scheme: { normal: 500, hover: 600, focus: 700 },
          colorScheme: 'red'
        }
      });

      expect(vm.colors.normal).toBe('var(--color-red-500)');
      expect(vm.colors.hover).toBe('var(--color-red-600)');
      expect(vm.colors.focus).toBe('var(--color-red-700)');
    });

    it('should render a rounded button', () => {
      const wrapper = mount(DspButton, { props: { isRounded: true } });

      const classes = wrapper.find('.dsp-button').classes();

      expect(classes).toContain('dsp-button--is-rounded');
    });

    it('should render a small button', () => {
      const wrapper = mount(DspButton, { props: { size: 'sm' } });

      const classes = wrapper.find('.dsp-button').classes();

      expect(classes).toContain('dsp-button--sm');
    });

    it('should render a medium sized button by default', () => {
      const wrapper = mount(DspButton);

      const classes = wrapper.find('.dsp-button').classes();

      expect(classes).toContain('dsp-button--md');
    });

    it('should render a small button', () => {
      const wrapper = mount(DspButton, { props: { size: 'sm' } });

      const classes = wrapper.find('.dsp-button').classes();

      expect(classes).toContain('dsp-button--sm');
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

  describe('events', () => {
    it('should emit click event when the button is clicked', () => {
      const wrapper = mount(DspButton);

      wrapper.find('button').trigger('click');

      expect(wrapper.emitted()).toHaveProperty('click');
    });
  });

  describe('slots', () => {
    it('should render default slot', () => {
      const text = 'Text Slot';
      const wrapper = mount(DspButton, {
        slots: { default: text }
      });
      const button = wrapper.find('.dsp-button');

      expect(button.text()).toContain(text);
    });

    it('should render left icon slot', () => {
      const slot = '<div class="my-left-icon"></div>';
      const wrapper = mount(DspButton, {
        slots: { leftIcon: slot }
      });

      expect(wrapper.find('.my-left-icon')).toBeDefined();
    });

    it('should render right icon slot', () => {
      const slot = '<div class="my-right-icon"></div>';
      const wrapper = mount(DspButton, {
        slots: { rightIcon: slot }
      });

      expect(wrapper.find('.my-right-icon')).toBeDefined();
    });
  });
});

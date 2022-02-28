import { mount } from '@vue/test-utils';
import DspBackLink from './index.vue';

describe('DspBackLink', () => {
  it('should render without throwing', () => {
    const text = 'Text example';

    expect(() =>
      mount(DspBackLink, {
        props: { label: text }
      })
    ).not.toThrow();
  });

  it('should render slot', () => {
    const text = 'Text example';
    const textSlot = 'Text example';

    const wrapper = mount(DspBackLink, {
      props: { label: text },
      slots: { default: textSlot }
    });

    const child = wrapper.find('.dsp-flex');

    expect(child.text()).toContain(text);
  });

  describe('props', () => {
    it('should render with a label text', () => {
      const text = 'Text label';
      const wrapper = mount(DspBackLink, {
        props: { label: text }
      });

      expect(wrapper.props('label')).toBe(text);
    });
  });

  describe('emit', () => {
    it('should emit click event when the button is clicked', () => {
      const text = 'Text example';
      const wrapper = mount(DspBackLink, {
        props: { label: text }
      });

      wrapper.find('button').trigger('click');

      expect(wrapper.emitted()).toHaveProperty('click');
    });
  });
});

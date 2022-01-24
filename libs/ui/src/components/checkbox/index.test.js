import { mount } from '@vue/test-utils';
import DspCheckbox from './index.vue';

describe('DspCheckbox', () => {
  it('should render without throwing', () => {
    const text = 'Text example';
    const modelValue = true;
    expect(() =>
      mount(DspCheckbox, { props: { label: text, modelValue: modelValue } })
    ).not.toThrow();
  });

  it('should render slot', () => {
    const textSlot = 'Text example slot';
    const textProps = 'Text example props';
    const modelValue = true;
    const wrapper = mount(DspCheckbox, {
      slots: { default: textSlot },
      props: { label: textProps, modelValue: modelValue }
    });

    const child = wrapper.find('label');

    expect(child.text()).toContain(textSlot);
  });

  describe('props', () => {
    it('should render a label', () => {
      const textLabel = 'Text example label';
      const modelValue = true;
      const wrapper = mount(DspCheckbox, {
        props: { label: textLabel, modelValue: modelValue }
      });

      expect(wrapper.props('label')).toBe(textLabel);
    });

    it('should be disabled', () => {
      const textLabel = 'Text example label';
      const modelValue = true;
      const disabled = true;
      const wrapper = mount(DspCheckbox, {
        props: { label: textLabel, modelValue: modelValue, disabled: disabled }
      });

      const checkbox = wrapper.find('input[type="checkbox"]');

      expect(checkbox.element.disabled).toBe(true);
    });
  });

  describe('emit', () => {
    it('should emit click event when the label is clicked', async () => {
      const textLabel = 'Text example label';
      const modelValue = true;
      const wrapper = mount(DspCheckbox, {
        props: { label: textLabel, modelValue: modelValue }
      });
      const label = wrapper.find('label');
      await label.trigger('click');

      expect(wrapper.emitted()).toHaveProperty('click');
    });

    it('should emit update:modelValue when checkbox is clicked', async () => {
      const textLabel = 'Text example label';
      const modelValue = false;
      const wrapper = mount(DspCheckbox, {
        props: { label: textLabel, modelValue: modelValue }
      });

      const checkbox = wrapper.find('input[type="checkbox"]');
      await checkbox.setChecked();

      expect(wrapper.emitted()).toHaveProperty('update:modelValue');
      expect(wrapper.emitted()['update:modelValue'][0]).toEqual([true]);
    });
  });

  it('should be checked/unchecked depending on modelValue', async () => {
    const textLabel = 'Text example label';
    const modelValue = false;
    const wrapper = mount(DspCheckbox, {
      props: { label: textLabel, modelValue: modelValue }
    });

    const checkbox = wrapper.find('input[type="checkbox"]');

    expect(checkbox.element.checked).toBe(false);

    await wrapper.setProps({ modelValue: true });

    expect(checkbox.element.checked).toBe(true);
  });
});

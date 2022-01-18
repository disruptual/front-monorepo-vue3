import { mount } from '@vue/test-utils';
import { addDays } from 'date-fns';
import DspDatePicker from './index.vue';

describe('DspDatePicker', () => {
  it('should render without throwing', () => {
    const modelValue = null;
    expect(() =>
      mount(DspDatePicker, { props: { modelValue: modelValue } })
    ).not.toThrow();
  });

  describe('props', () => {});
  describe('emit', () => {
    it('should emit update:modelValue when a date is selected', async () => {
      const date = new Date(new Date().setHours(0, 0, 0, 0));
      const modelValue = date;
      const expectedModelValue = addDays(date, 1);

      const wrapper = mount(DspDatePicker, {
        props: { modelValue: modelValue }
      });

      const openCalendarButton = wrapper.find('.dropdown-toggle');
      await openCalendarButton.trigger('click');
      const nextDayButton = wrapper.find(
        '.dsp-date-picker__calendar > button.dsp-date-picker__cell--active + button'
      );
      await nextDayButton.trigger('click');

      expect(wrapper.emitted()).toHaveProperty('update:modelValue');
      expect(wrapper.emitted()['update:modelValue'][0][0]).toEqual(
        expectedModelValue
      );
    });
  });
});

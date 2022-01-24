import { mount } from '@vue/test-utils';
import { addDays, format } from 'date-fns';
import frLocale from 'date-fns/locale/fr';
import DspDatePicker from './index.vue';

describe('DspDatePicker', () => {
  it('should render without throwing', () => {
    const modelValue = null;
    expect(() =>
      mount(DspDatePicker, { props: { modelValue: modelValue } })
    ).not.toThrow();
  });

  describe('props', () => {
    it('should render a date', () => {
      const date = new Date(new Date().setHours(0, 0, 0, 0));
      const modelValue = date;
      const wrapper = mount(DspDatePicker, {
        props: { modelValue: modelValue }
      });

      format(date, 'dd-MM-yyyy', { locale: frLocale });
      const inputValue = wrapper.find('input').element.value;
      const formatedProps = format(wrapper.props('modelValue'), 'dd-MM-yyyy', {
        locale: frLocale
      });

      expect(formatedProps).toBe(inputValue);
    });
  });
  describe('emit', () => {
    it('should emit update:modelValue when a date is selected', async () => {
      const date = new Date(new Date().setHours(0, 0, 0, 0));
      const modelValue = date;
      const expectedModelValue = addDays(date, 1);
      const wrapper = mount(DspDatePicker, {
        props: { modelValue: modelValue }
      });

      const openCalendarButton = wrapper.find('.dropdown-toggle');
      await openCalendarButton.trigger('focus');

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

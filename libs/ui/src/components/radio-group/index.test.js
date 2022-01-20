import { mount } from '@vue/test-utils';
import DspRadioGroup from './index.vue';

const valuesTest = [
  { label: 'test1', value: 'test1' },
  { label: 'test2', value: 'test2' },
  { label: 'test3', value: 'test3' },
  { label: 'test4', value: 'test4' }
];

describe('DspRadioGroup', () => {
  it('should render without throwing', () => {
    expect(() =>
      mount(DspRadioGroup, {
        props: { modelValue: null, values: valuesTest }
      })
    ).not.toThrow();
  });

  it('should return the good value for each radio checked', () => {
    const expectedModelValues = [
      valuesTest[0].value,
      valuesTest[1].value,
      valuesTest[2].value,
      valuesTest[3].value
    ];
    const wrapper = mount(DspRadioGroup, {
      props: { modelValue: null, values: valuesTest }
    });

    const childs = wrapper.findAll('input[type="radio"]');
    childs.map(async (child, index) => {
      await child.setChecked();
      await child.trigger('input');

      expect(wrapper.emitted()).toHaveProperty('update:modelValue');
      expect(wrapper.emitted()['update:modelValue'][0]).toEqual([
        expectedModelValues[index]
      ]);
    });
  });

  describe('emit', () => {
    it('should emit update:modelValue at input event', async () => {
      const expectedModelValue = valuesTest[1].value;
      const wrapper = mount(DspRadioGroup, {
        props: { modelValue: null, values: valuesTest }
      });

      const secondInputRadio = wrapper.findAll('input[type="radio"]')[1];
      await secondInputRadio.setChecked();
      await secondInputRadio.trigger('input');

      expect(wrapper.emitted()).toHaveProperty('update:modelValue');
      expect(wrapper.emitted()['update:modelValue'][0]).toEqual([
        expectedModelValue
      ]);
    });
  });

  describe('props', () => {
    it('should render exact number of radio depending on values', async () => {
      const wrapper = mount(DspRadioGroup, {
        props: { modelValue: null, values: valuesTest }
      });

      const child = wrapper.findAll('.dsp-radio');

      expect(child).toHaveLength(valuesTest.length);
    });
  });
});

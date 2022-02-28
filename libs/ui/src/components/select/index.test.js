import { mount } from '@vue/test-utils';
import DspSelect from './index.vue';

const options = [
  { label: 'test1', value: 'test1' },
  { label: 'test2', value: 'test2' },
  { label: 'test3', value: 'test3' },
  { label: 'test4', value: 'test4' }
];

describe('DspSelect', () => {
  it('should render without throwing', () => {
    expect(() =>
      mount(DspSelect, {
        props: { modelValue: null, options: options }
      })
    ).not.toThrow();
  });

  describe('emit', () => {
    it('should emit update:modelValue with selected option value', async () => {
      const wrapper = mount(DspSelect, {
        props: { modelValue: null, options: options }
      });

      let option = wrapper.findAll('option')[3];
      await option.setSelected();

      expect(wrapper.emitted()).toHaveProperty('update:modelValue');
      expect(wrapper.emitted()['update:modelValue'][0][0]).toEqual(
        options[2].value
      );

      option = wrapper.findAll('option')[2];
      await option.setSelected();

      expect(wrapper.emitted()).toHaveProperty('update:modelValue');
      expect(wrapper.emitted()['update:modelValue'][1][0]).toEqual(
        options[1].value
      );
    });
  });

  describe('props', () => {
    it('should render multiple values', async () => {
      const expectedIds = [options[1].id, options[2].id];
      const wrapper = mount(DspSelect, {
        props: { modelValue: null, options: options, multiple: true }
      });

      const secondOption = wrapper.findAll('option')[1];
      await secondOption.setSelected();

      const thirdOption = wrapper.findAll('option')[2];
      await thirdOption.setSelected();

      expect(wrapper.emitted()['update:modelValue'][1][0]).toHaveLength(2);
      expect(wrapper.emitted()['update:modelValue'][1][0][0].id).toEqual(
        expectedIds[0]
      );
      expect(wrapper.emitted()['update:modelValue'][1][0][1].id).toEqual(
        expectedIds[1]
      );
    });
  });
});

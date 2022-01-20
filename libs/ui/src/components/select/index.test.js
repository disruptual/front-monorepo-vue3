import { mount } from '@vue/test-utils';
import DspSelect from './index.vue';

const valuesTest = [
  { id: 'test1', name: 'test1' },
  { id: 'test2', name: 'test2' },
  { id: 'test3', name: 'test3' },
  { id: 'test4', name: 'test4' }
];

describe('DspSelect', () => {
  it('should render without throwing', () => {
    expect(() =>
      mount(DspSelect, {
        props: { modelValue: null, options: valuesTest }
      })
    ).not.toThrow();
  });

  describe('emit', () => {
    it('should emit update:modelValue with third option value', async () => {
      const expectedId2 = valuesTest[2].id;
      const wrapper = mount(DspSelect, {
        props: { modelValue: null, options: valuesTest }
      });

      const option = wrapper.findAll('option')[2];
      await option.setSelected();

      expect(wrapper.emitted()).toHaveProperty('update:modelValue');
      expect(wrapper.emitted()['update:modelValue'][0][0].id).toEqual(
        expectedId2
      );
    });

    it('should emit update:modelValue with second option value', async () => {
      const expectedId2 = valuesTest[1].id;
      const wrapper = mount(DspSelect, {
        props: { modelValue: null, options: valuesTest }
      });

      const secondOption = wrapper.findAll('option')[1];
      await secondOption.setSelected();

      expect(wrapper.emitted()).toHaveProperty('update:modelValue');
      expect(wrapper.emitted()['update:modelValue'][0][0].id).toEqual(
        expectedId2
      );
    });
  });

  describe('props', () => {
    it('should render multiple values', async () => {
      const expectedIds = [valuesTest[1].id, valuesTest[2].id];
      const wrapper = mount(DspSelect, {
        props: { modelValue: null, options: valuesTest, multiple: true }
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

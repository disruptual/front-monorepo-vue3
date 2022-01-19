import { mount } from '@vue/test-utils';
import DspInputSearch from './index.vue';

describe('DspInputSearch', () => {
  it('should render without throwing', () => {
    expect(() => mount(DspInputSearch)).not.toThrow();
  });

  describe('emit', () => {
    it('should emit a change event at click event', async () => {
      const wrapper = mount(DspInputSearch);

      const input = wrapper.find('input');
      const button = wrapper.find('button');
      await button.trigger('click');

      expect(wrapper.emitted().click).toBeTruthy();
      expect(wrapper.emitted().change).toBeTruthy();
    });

    it('should emit a change event at keyup enter', async () => {
      const wrapper = mount(DspInputSearch);

      const input = wrapper.find('input');
      await input.trigger('keyup', { keyCode: 65 });
      await input.trigger('keyup.enter');

      expect(wrapper.emitted().change).toBeTruthy();
    });

    it('should emit an input event at input action', async () => {
      const inputValueTest = 'hello';
      const wrapper = mount(DspInputSearch);

      const input = wrapper.find('input');
      input.element.value = inputValueTest;
      await input.trigger('input');

      expect(wrapper.emitted().input).toBeTruthy();
      expect(wrapper.emitted().input[0][0]).toEqual(inputValueTest);
    });
  });
});

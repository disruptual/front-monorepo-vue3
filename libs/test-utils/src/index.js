import { mount } from '@vue/test-utils';
import MockAdapter from 'axios-mock-adapter';

import { plugin as uiPlugin } from '../../ui/src/plugin';
import theme from '../../default-theme/src/index';
import { createQueryClient } from '../../core/src/factories/queryClient.factory';
import { HttpService } from '../../core/src/services/http.service';

export const mountComponent = (component, { props, slots } = {}) => {
  const httpService = new HttpService({ baseURL: '/' });
  const mock = new MockAdapter(httpService.axios);
  mock.onGet('test-file-path').reply(200, '<svg></svg>');

  const wrapper = mount(component, {
    props,
    slots,
    global: {
      plugins: [uiPlugin(theme)],
      provide: {
        HTTP_SERVICE: httpService,
        APP_CONTEXT: {},
        VUE_QUERY_CLIENT: createQueryClient()
      }
    }
  });

  wrapper.httpMock = mock;

  return wrapper;
};

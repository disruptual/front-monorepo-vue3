import { config } from '@vue/test-utils';
import MockAdapter from 'axios-mock-adapter';

import { plugin as uiPlugin } from '../../ui/src/plugin';
import theme from '../../default-theme/src/index';
import { createQueryClient } from '../../core/src/factories/queryClient.factory';
import { HttpService } from '../../core/src/services/http.service';

const httpService = new HttpService({ baseURL: '/' });
const httpMock = new MockAdapter(httpService.axios);
httpMock.onGet('test-file-path').reply(200, '<svg></svg>');

config.global.plugins = [uiPlugin(theme)];
config.global.provide = {
  HTTP_SERVICE: httpService,
  APP_CONTEXT: {},
  VUE_QUERY_CLIENT: createQueryClient()
};

export { httpMock };

import {
  AuthService,
  AuthServiceOptions,
  WithSSO
} from '@/services/auth.service';
import { DisruptualClient } from '@/services/client.service';
import { HttpService } from '@/services/http.service';

export type CreateClientOptions = WithSSO<{
  baseURL: string;
}>;

export const createClient = ({
  baseURL,
  sso,
  ssoOptions
}: CreateClientOptions) => {
  const http = new HttpService({ baseURL });
  // @FIXME how to make WithSSO typings work ?
  const auth = new AuthService({ http, sso, ssoOptions } as AuthServiceOptions);

  return new DisruptualClient({ http, auth });
};

import { WithSSO } from '@/services/auth.service';
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

  return new DisruptualClient({ http, sso, ssoOptions });
};

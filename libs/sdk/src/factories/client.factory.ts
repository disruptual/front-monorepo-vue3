import {
  AuthService,
  AuthServiceOptions,
  WithSSO
} from '@/services/auth.service';
import { DisruptualClient } from '@/services/client.service';

export type CreateClientOptions = WithSSO<{
  baseURL: string;
}>;

export const createClient = (options: CreateClientOptions) => {
  return DisruptualClient.create(options);
};

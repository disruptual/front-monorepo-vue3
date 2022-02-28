import {
  CreateClientOptions,
  DisruptualClient
} from '@/services/client.service';

export const createClient = (options: CreateClientOptions) =>
  DisruptualClient.create(options);

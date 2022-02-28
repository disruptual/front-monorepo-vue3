import { IAuth } from '@/interfaces/auth.interface';
import { IHttp } from '@/interfaces/http.interface';
import { Maybe } from '@/utils/types';
import { AuthService, AuthServiceOptions, WithSSO } from './auth.service';
import { EventEmitter } from './event-emitter.service';
import { HttpService } from './http.service';
import clients from '@/clients.json';

export type DisruptualClientOptions = {
  APIKey: string;
  options: WithSSO<{
    autoConnect: boolean;
  }>;
};

export type CreateClientOptions = WithSSO<{
  APIKey: string;
  autoConnect?: boolean;
}>;

export type DisruptualEvents = {
  ready: void;
};

export class DisruptualClient extends EventEmitter<DisruptualEvents> {
  http!: IHttp;

  auth!: IAuth;

  private APIKey: string;

  private options: DisruptualClientOptions['options'];

  private isInitialized: boolean = false;

  private constructor({ APIKey, options }: DisruptualClientOptions) {
    super();
    this.APIKey = APIKey;
    this.options = options;
  }

  private static _instance: Maybe<DisruptualClient> = null;

  static get instance() {
    if (!this._instance) throw new Error('Disruptual client not instanciated');

    return this._instance;
  }

  static create({
    APIKey,
    autoConnect = true,
    sso,
    ssoOptions
  }: CreateClientOptions) {
    DisruptualClient._instance = new DisruptualClient({
      APIKey,
      // @ts-ignore
      options: {
        autoConnect,
        sso,
        ssoOptions
      }
    });

    return DisruptualClient.instance;
  }

  private async getConfig() {
    const config = clients[this.APIKey as keyof typeof clients];
    if (!config) throw new Error('Wrong API Key');

    return config;
  }

  async init() {
    if (this.isInitialized) {
      console.warn('Disrutual client already initialized.');
    }
    this.isInitialized = true;

    const { baseURL } = await this.getConfig();

    this.http = new HttpService({ baseURL });
    this.auth = new AuthService({
      http: this.http,
      sso: this.options.sso,
      ssoOptions: this.options.ssoOptions
    } as AuthServiceOptions);

    if (this.options.autoConnect) {
      await this.auth.authenticate();
    }

    this.emit('ready');
  }
}

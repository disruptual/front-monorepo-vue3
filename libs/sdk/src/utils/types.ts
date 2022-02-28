export type Maybe<T> = T | null;

export type MaybeAsync<T> = T | Promise<T>;

export type Endpoint<T extends string = string> = `/${T}`;

export type URI<T extends Endpoint> = T | `${T}/${UUID}`;

export type UUID = number | string;

export type JWT = string;

export type SSOToken = string;

export type Timestamp = number;

export type Constructor<T> = new (...args: any[]) => T;

export type JwtPayload = {
  exp: Timestamp;
  id: UUID;
};

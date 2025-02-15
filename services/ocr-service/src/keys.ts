import { BindingKey } from '@loopback/core';
import { BINDING_PREFIX } from '@sourceloop/core';
import {
  IRequestServiceConfig,
  IRequest
} from './types';

export namespace RequestServiceBindings {
  export const Config = BindingKey.create<IRequestServiceConfig>(
    `${BINDING_PREFIX}.request.config`,
  );
  export const FetchProvider = BindingKey.create<IRequest>(
    `${BINDING_PREFIX}.request.fetch`,
  );
}

import {Provider} from '@loopback/context';
import {IAuthUser, Keycloak} from 'loopback4-authentication';

import {KeyCloakPreVerifyFn} from './types';

export class KeyCloakPreVerifyProvider
  implements Provider<KeyCloakPreVerifyFn>
{
  constructor() {}

  value(): KeyCloakPreVerifyFn {
    return async (
      accessToken: string,
      refreshToken: string,
      profile: Keycloak.Profile,
      user: IAuthUser | null,
    ) => user;
  }
}

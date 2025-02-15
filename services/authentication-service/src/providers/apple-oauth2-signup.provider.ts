import {Provider} from '@loopback/context';
import {HttpErrors} from '@loopback/rest';
import {AppleSignUpFn} from './types';

export class AppleOauth2SignupProvider implements Provider<AppleSignUpFn> {
  value(): AppleSignUpFn {
    return async profile => {
      throw new HttpErrors.NotImplemented(
        `AppleOauth2SignupProvider not implemented`,
      );
    };
  }
}

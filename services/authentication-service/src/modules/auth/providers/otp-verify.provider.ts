import {inject, Provider} from '@loopback/context';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {
  AuthenticationBindings,
  AuthErrorKeys,
  VerifyFunction,
} from 'loopback4-authentication';
import {OtpCacheRepository, UserRepository} from '../../../repositories';
import {ILogger, LOGGER} from '@sourceloop/core';
import {totp} from 'otplib';
import {OtpSenderService} from '../../../services';
import {AuthClient} from '../../../models';

export class OtpVerifyProvider implements Provider<VerifyFunction.OtpAuthFn> {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @repository(OtpCacheRepository)
    public otpCacheRepo: OtpCacheRepository,
    @inject(LOGGER.LOGGER_INJECT) private readonly logger: ILogger,
    @inject(AuthenticationBindings.CURRENT_CLIENT)
    private readonly client: AuthClient,
    @inject('services.OtpSenderService')
    private readonly otpSenderService: OtpSenderService,
  ) {}

  value(): VerifyFunction.OtpAuthFn {
    return async (username: string, otp: string) => {
      const user = await this.userRepository.findOne({
        where: {
          username: username,
        },
      });

      //sender
      if (!otp) {
        await this.otpSenderService.sendOtp(this.client, username);
        return user;
      }

      //verifier
      const otpCache = await this.otpCacheRepo.get(username);
      if (!otpCache) {
        this.logger.error('Invalid Username');
        throw new HttpErrors.Unauthorized(AuthErrorKeys.InvalidCredentials);
      }

      let isValid = false;
      try {
        isValid = totp.check(otp, otpCache.otpSecret!);
      } catch (err) {
        this.logger.error(err);
        throw new HttpErrors.Unauthorized(AuthErrorKeys.InvalidCredentials);
      }
      if (!isValid) {
        throw new HttpErrors.Unauthorized(AuthErrorKeys.OtpInvalid);
      }
      return user;
    };
  }
}

import {inject} from '@loopback/context';
import {repository} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  post,
  Request,
  requestBody,
  Response,
  RestBindings,
} from '@loopback/rest';
import {
  CONTENT_TYPE,
  ILogger,
  LOGGER,
  STATUS_CODE,
  X_TS_TYPE,
} from '@sourceloop/core';
import * as jwt from 'jsonwebtoken';
import {
  authenticate,
  authenticateClient,
  AuthenticationBindings,
  AuthErrorKeys,
  ClientAuthCode,
  STRATEGY,
} from 'loopback4-authentication';
import {authorize} from 'loopback4-authorization';
import {URLSearchParams} from 'url';

import {User} from '../../models';
import {AuthCodeBindings, CodeWriterFn} from '../../providers';
import {AuthClientRepository} from '../../repositories';
import {AuthUser} from './models/auth-user.model';
import {ClientAuthRequest} from './models/client-auth-request.dto';
import {TokenResponse} from './models/token-response.dto';

const queryGen = (from: 'body' | 'query') => {
  return (req: Request) => {
    return {
      state: `client_id=${req[from].client_id}`,
    };
  };
};

export class InstagramLoginController {
  constructor(
    @repository(AuthClientRepository)
    public authClientRepository: AuthClientRepository,
    @inject(LOGGER.LOGGER_INJECT) public logger: ILogger,
  ) {}

  @authenticateClient(STRATEGY.CLIENT_PASSWORD)
  @authenticate(
    STRATEGY.INSTAGRAM_OAUTH2,
    {
      accessType: 'offline',
      authorizationURL: process.env.INSTAGRAM_AUTH_URL,
      callbackURL: process.env.INSTAGRAM_AUTH_CALLBACK_URL,
      clientID: process.env.INSTAGRAM_AUTH_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_AUTH_CLIENT_SECRET,
      tokenURL: process.env.INSTAGRAM_AUTH_TOKEN_URL,
    },
    queryGen('body'),
  )
  @authorize({permissions: ['*']})
  @post('/auth/instagram', {
    responses: {
      [STATUS_CODE.OK]: {
        description: 'POST Call for Instagram based login',
        content: {
          [CONTENT_TYPE.JSON]: {
            schema: {[X_TS_TYPE]: TokenResponse},
          },
        },
      },
    },
  })
  async postLoginViaInstagram(
    @requestBody({
      content: {
        [CONTENT_TYPE.FORM_URLENCODED]: {
          schema: getModelSchemaRef(ClientAuthRequest),
        },
      },
    })
    clientCreds?: ClientAuthRequest,
  ): Promise<void> {}

  @authenticate(
    STRATEGY.INSTAGRAM_OAUTH2,
    {
      accessType: 'offline',
      authorizationURL: process.env.INSTAGRAM_AUTH_URL,
      callbackURL: process.env.INSTAGRAM_AUTH_CALLBACK_URL,
      clientID: process.env.INSTAGRAM_AUTH_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_AUTH_CLIENT_SECRET,
      tokenURL: process.env.INSTAGRAM_AUTH_TOKEN_URL,
    },
    queryGen('query'),
  )
  @authorize({permissions: ['*']})
  @get('/auth/instagram-auth-redirect', {
    responses: {
      [STATUS_CODE.OK]: {
        description: 'Instagram Redirect Token Response',
        content: {
          [CONTENT_TYPE.JSON]: {
            schema: {[X_TS_TYPE]: TokenResponse},
          },
        },
      },
    },
  })
  async instagramCallback(
    @param.query.string('code') code: string,
    @param.query.string('state') state: string,
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @inject(AuthCodeBindings.CODEWRITER_PROVIDER)
    instgaramCodeWriter: CodeWriterFn,
    @inject(AuthenticationBindings.CURRENT_USER)
    user: AuthUser | undefined,
  ): Promise<void> {
    const clientId = new URLSearchParams(state).get('client_id');
    if (!clientId || !user) {
      throw new HttpErrors.Unauthorized(AuthErrorKeys.ClientInvalid);
    }
    const client = await this.authClientRepository.findOne({
      where: {
        clientId,
      },
    });
    if (!client || !client.redirectUrl) {
      throw new HttpErrors.Unauthorized(AuthErrorKeys.ClientInvalid);
    }
    try {
      const codePayload: ClientAuthCode<User, typeof User.prototype.id> = {
        clientId,
        user: user,
      };
      const token = await instgaramCodeWriter(
        jwt.sign(codePayload, client.secret, {
          expiresIn: client.authCodeExpiration,
          audience: clientId,
          issuer: process.env.JWT_ISSUER,
          algorithm: 'HS256',
        }),
      );
      response.redirect(`${client.redirectUrl}?code=${token}`);
    } catch (error) {
      this.logger.error(error);
      throw new HttpErrors.Unauthorized(AuthErrorKeys.InvalidCredentials);
    }
  }
}

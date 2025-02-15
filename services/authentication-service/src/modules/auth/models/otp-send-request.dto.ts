import {Model, model, property} from '@loopback/repository';
import {ModelPropertyDescriptionString} from './model-property-description.enum';

@model({
  description: 'This is the signature for OTP login request.',
})
export class OtpSendRequest extends Model {
  @property({
    type: 'string',
    description: ModelPropertyDescriptionString.reqStrPropDesc,
    required: true,
  })
  // eslint-disable-next-line @typescript-eslint/naming-convention
  client_id: string;

  @property({
    type: 'string',
    description: ModelPropertyDescriptionString.reqStrPropDesc,
    required: true,
  })
  // eslint-disable-next-line @typescript-eslint/naming-convention
  client_secret: string;

  @property({
    type: 'string',
    description: ModelPropertyDescriptionString.reqStrPropDesc,
    required: true,
  })
  key: string;

  constructor(data?: Partial<OtpSendRequest>) {
    super(data);
  }
}

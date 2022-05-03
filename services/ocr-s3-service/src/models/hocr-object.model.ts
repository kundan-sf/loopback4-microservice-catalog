import {Entity, model, property} from '@loopback/repository';
import {v4 as uuid} from 'uuid';


@model({
  settings: {
    mysql: {
      table: "hocr_results"
    }
  }
})
export class HocrObject extends Entity {
  @property({
    type: 'string',
    id: true,
    default: () => uuid()
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  contract_name: string;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'number',
    required: true,
  })
  page_no: number;

  @property({
    type: 'string',
  })
  hocr_data?: string;

  @property({
    type: 'string',
  })
  img_data?: string;

  @property({
    type: 'string',
    required: true,
  })
  created_by: string;

  @property({
    type: 'string',
    required: true,
  })
  modified_by: string;

  @property({
    type: 'date',
    default: new Date(),
  })
  created_on?: string;

  @property({
    type: 'date',
    default: new Date(),
  })
  modified_on?: string;


  @property({
    type: 'boolean',
    default: false,
  })
  deleted?: boolean;

  @property({
    type: 'string',
  })
  deleted_by?: string;

  @property({
    type: 'date'
  })
  deleted_on?: string;


  constructor(data?: Partial<HocrObject>) {
    super(data);
  }
}

export interface HocrObjectRelations {
  // describe navigational properties here
}

export type HocrObjectWithRelations = HocrObject & HocrObjectRelations;

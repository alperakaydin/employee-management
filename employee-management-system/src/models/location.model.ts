import {Entity, hasMany, model, property} from '@loopback/repository';
import {Department} from './department.model';

@model()
export class Location extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  address?: string;

  @property({
    type: 'number',
  })
  postalCode?: number;

  @property({
    type: 'string',
  })
  city?: string;

  @property({
    type: 'string',
  })
  country?: string;

  @hasMany(() => Department, {keyTo: 'location'})
  departments: Department[];

  constructor(data?: Partial<Location>) {
    super(data);
  }
}

export interface LocationRelations {
  // describe navigational properties here
}

export type LocationWithRelations = Location & LocationRelations;

import {Entity, model, property} from '@loopback/repository';

@model()
export class TitleHistory extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  startDate: string;

  @property({
    type: 'date',
    required: true,
  })
  finishDate: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  department: string;

  @property({
    type: 'number',
  })
  employeeId?: number;

  constructor(data?: Partial<TitleHistory>) {
    super(data);
  }
}

export interface TitleHistoryRelations {
  // describe navigational properties here
}

export type TitleHistoryWithRelations = TitleHistory & TitleHistoryRelations;

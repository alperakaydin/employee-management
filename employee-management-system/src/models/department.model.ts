import {Entity, hasMany, model, property} from '@loopback/repository';
import {Employee} from './employee.model';

@model()
export class Department extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  manager: string;

  @property({
    type: 'string',
    required: true,
  })
  location: string;

  @hasMany(() => Employee, {keyTo: 'department'})
  employees: Employee[];

  /* @property({
    type: 'string',
  })
  locationName?: string; */

  constructor(data?: Partial<Department>) {
    super(data);
  }
}

export interface DepartmentRelations {
  // describe navigational properties here
}

export type DepartmentWithRelations = Department & DepartmentRelations;

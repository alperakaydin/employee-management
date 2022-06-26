import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  Department, Location
} from '../models';
import {LocationRepository} from '../repositories';

export class LocationDepartmentController {
  constructor(
    @repository(LocationRepository) protected locationRepository: LocationRepository,
  ) { }

  @get('/locations/{id}/departments', {
    responses: {
      '200': {
        description: 'Array of Location has many Department',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Department, {includeRelations: true})},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Department>,
  ): Promise<Department[]> {
    return this.locationRepository.departments(id).find(filter);
  }

  @post('/locations/{id}/departments', {
    responses: {
      '200': {
        description: 'Location model instance',
        content: {'application/json': {schema: getModelSchemaRef(Department)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Location.prototype.name,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Department, {
            title: 'NewDepartmentInLocation',
            exclude: ['name'],
            optional: ['location']
          }),
        },
      },
    }) department: Omit<Department, 'name'>,
  ): Promise<Department> {
    return this.locationRepository.departments(id).create(department);
  }

  @patch('/locations/{id}/departments', {
    responses: {
      '200': {
        description: 'Location.Department PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Department, {partial: true}),
        },
      },
    })
    department: Partial<Department>,
    @param.query.object('where', getWhereSchemaFor(Department)) where?: Where<Department>,
  ): Promise<Count> {
    return this.locationRepository.departments(id).patch(department, where);
  }

  @del('/locations/{id}/departments', {
    responses: {
      '200': {
        description: 'Location.Department DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Department)) where?: Where<Department>,
  ): Promise<Count> {
    return this.locationRepository.departments(id).delete(where);
  }
}

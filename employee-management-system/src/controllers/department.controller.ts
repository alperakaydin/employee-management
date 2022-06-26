import {inject} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Department} from '../models';
import {DepartmentRepository, LocationRepository} from '../repositories';
import {DepAvgSalaryService, LocationGenerate} from '../services';

export class DepartmentController {
  constructor(
    @repository(DepartmentRepository)
    public departmentRepository: DepartmentRepository,

    @repository(LocationRepository)
    public locationRepository: LocationRepository,

    @inject('service.calculator')
    public avgCalculator: DepAvgSalaryService,

    @inject('service.LocationGenerate')
    protected locationGenerate: LocationGenerate,

  ) { }

  @post('/departments')
  @response(200, {
    description: 'Department model instance',
    content: {'application/json': {schema: getModelSchemaRef(Department)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Department, {
            title: 'NewDepartment',

          }),
        },
      },
    })
    department: Department,
  ): Promise<Department> {
    return this.departmentRepository.create(department);
  }

  @post('/departments-auto-location')
  @response(200, {
    description: 'Department model instance',
    content: {'application/json': {schema: getModelSchemaRef(Department)}},
  })
  async createWithLocation(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Department, {
            title: 'NewDepartment',

          }),
        },
      },
    })
    department: Department,
  ): Promise<Department> {
    let data = await this.departmentRepository.create(department);

    let latitude = "40.93268";
    let longtitude = "29.13133";
    // Rastgele enlem boylam üret ve türkiyeye göre sınırla
    //

    /* let loc = await this.locationGenerate.getLocation(latitude, longtitude); */

    /* console.log(loc); */
    /*  await this.addressGenerate.addressGenerateAndCreateLocation(department); */

    /* this.locationRepository.create(location) */


    return data;
  }

  @get('/departments/count')
  @response(200, {
    description: 'Department model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Department) where?: Where<Department>,
  ): Promise<Count> {
    return this.departmentRepository.count(where);
  }

  @get('/departmentsAllEmployee')
  @response(200, {
    description: 'Array of Department model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Department, {includeRelations: true}),
        },
      },
    },
  })
  async findAll(
    @param.filter(Department) filter?: Filter<Department>,
  ): Promise<Department[]> {



    const data = await this.departmentRepository.find({include: ['employees']});

    return data;

  }

  @get('/departments-avarage-salary/{id}')
  @response(200, {
    description: 'Department avarage salary',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Department, {includeRelations: true}),
      },
    },
  })
  async salaryAvarage(
    @param.path.string('id') id: string
  ): Promise<number> {

    /* const data = await this.departmentRepository.find({include: ['employees']}); */

    let data = await this.departmentRepository.findById(id, {include: ['employees']});

    console.log(this.avgCalculator.avarageCalculator(data));
    return this.avgCalculator.avarageCalculator(data);
  }


  @get('/departments')
  @response(200, {
    description: 'Array of Department model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Department, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Department) filter?: Filter<Department>,
  ): Promise<Department[]> {
    return this.departmentRepository.find(filter);
  }

  @patch('/departments')
  @response(200, {
    description: 'Department PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Department, {partial: true}),
        },
      },
    })
    department: Department,
    @param.where(Department) where?: Where<Department>,
  ): Promise<Count> {
    return this.departmentRepository.updateAll(department, where);
  }

  @get('/departments/{id}')
  @response(200, {
    description: 'Department model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Department, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Department, {exclude: 'where'}) filter?: FilterExcludingWhere<Department>
  ): Promise<Department> {
    return this.departmentRepository.findById(id, filter);
  }

  @patch('/departments/{id}')
  @response(204, {
    description: 'Department PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Department, {partial: true}),
        },
      },
    })
    department: Department,
  ): Promise<void> {
    await this.departmentRepository.updateById(id, department);
  }

  @put('/departments/{id}')
  @response(204, {
    description: 'Department PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() department: Department,
  ): Promise<void> {
    await this.departmentRepository.replaceById(id, department);
  }

  @del('/departments/{id}')
  @response(204, {
    description: 'Department DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.departmentRepository.deleteById(id);
  }
}

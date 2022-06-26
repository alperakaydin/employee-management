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
  HttpErrors,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  Employee,
  TitleHistory
} from '../models';
import {EmployeeRepository, TitleHistoryRepository} from '../repositories';

export class EmployeeTitleHistoryController {
  constructor(
    @repository(EmployeeRepository) protected employeeRepository: EmployeeRepository,
    @repository(TitleHistoryRepository) protected TitleHistoryRepository: TitleHistoryRepository,
  ) { }

  @get('/employees/{id}/title-histories', {
    responses: {
      '200': {
        description: 'Array of Employee has many TitleHistory',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TitleHistory)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<TitleHistory>,
  ): Promise<TitleHistory[]> {
    return this.employeeRepository.titleHistories(id).find(filter);
  }


  @get('/employees-change-title/{id}/{title}', {
    responses: {
      '200': {
        description: 'Create and Return TitleHistory',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TitleHistory)},
          },
        },
      },
    },
  })
  async newHistory(
    @param.path.number('id') id: number,
    @param.path.string('title') title: string
  ): Promise<TitleHistory> {
    const newTitleHistory = new TitleHistory();
    let employee = this.employeeRepository.findById(id);


    try {
      // Kişinin daha önce ünvan değiştirdiyse startDate son unvanının finishi
      // Employee e ait title historyleri sırayla listeler bugünden geçmişe sıralı
      const _titlehistories = await this.TitleHistoryRepository.find(
        {order: ["finishDate DESC"], where: {"employeeId": id}}
      );


      newTitleHistory.startDate = _titlehistories[0].finishDate;
      newTitleHistory.finishDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
      newTitleHistory.department = (await employee).department;
      newTitleHistory.title = (await employee).title;
      newTitleHistory.employeeId = id;

      this.employeeRepository.updateById(id, {"title": title});

      console.log("Birden Fazla ünvan değişikliği");

      return this.TitleHistoryRepository.create(newTitleHistory);

    } catch (e) {
      // ilk unvan değişikliği ise

      if (e) {
        console.log(" İLK ünvan değişimi");

        newTitleHistory.startDate = (await employee).startDate;
        newTitleHistory.finishDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
        newTitleHistory.department = (await employee).department;
        newTitleHistory.title = (await employee).title;
        newTitleHistory.employeeId = id;

        /* (await employee).title = title; */
        this.employeeRepository.updateById(id, {"title": title});

        return this.TitleHistoryRepository.create(newTitleHistory);

      } else {
        throw new HttpErrors.InternalServerError(
          "Error: Title not changed! "
        );
      }
    }
  }



  @post('/employees/{id}/title-histories', {
    responses: {
      '200': {
        description: 'Employee model instance',
        content: {'application/json': {schema: getModelSchemaRef(TitleHistory)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Employee.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TitleHistory, {
            title: 'NewTitleHistoryInEmployee',
            exclude: ['id'],
            optional: ['employeeId']
          }),
        },
      },
    }) titleHistory: Omit<TitleHistory, 'id'>,
  ): Promise<TitleHistory> {
    return this.employeeRepository.titleHistories(id).create(titleHistory);
  }

  @patch('/employees/{id}/title-histories', {
    responses: {
      '200': {
        description: 'Employee.TitleHistory PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TitleHistory, {partial: true}),
        },
      },
    })
    titleHistory: Partial<TitleHistory>,
    @param.query.object('where', getWhereSchemaFor(TitleHistory)) where?: Where<TitleHistory>,
  ): Promise<Count> {
    return this.employeeRepository.titleHistories(id).patch(titleHistory, where);
  }

  @del('/employees/{id}/title-histories', {
    responses: {
      '200': {
        description: 'Employee.TitleHistory DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(TitleHistory)) where?: Where<TitleHistory>,
  ): Promise<Count> {
    return this.employeeRepository.titleHistories(id).delete(where);
  }
}

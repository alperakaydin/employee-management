import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {TitleHistory} from '../models';
import {TitleHistoryRepository} from '../repositories';

export class TitleHistoryController {
  constructor(
    @repository(TitleHistoryRepository)
    public titleHistoryRepository : TitleHistoryRepository,
  ) {}

  @post('/title-histories')
  @response(200, {
    description: 'TitleHistory model instance',
    content: {'application/json': {schema: getModelSchemaRef(TitleHistory)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TitleHistory, {
            title: 'NewTitleHistory',
            exclude: ['id'],
          }),
        },
      },
    })
    titleHistory: Omit<TitleHistory, 'id'>,
  ): Promise<TitleHistory> {
    return this.titleHistoryRepository.create(titleHistory);
  }

  @get('/title-histories/count')
  @response(200, {
    description: 'TitleHistory model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TitleHistory) where?: Where<TitleHistory>,
  ): Promise<Count> {
    return this.titleHistoryRepository.count(where);
  }

  @get('/title-histories')
  @response(200, {
    description: 'Array of TitleHistory model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TitleHistory, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TitleHistory) filter?: Filter<TitleHistory>,
  ): Promise<TitleHistory[]> {
    return this.titleHistoryRepository.find(filter);
  }

  @patch('/title-histories')
  @response(200, {
    description: 'TitleHistory PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TitleHistory, {partial: true}),
        },
      },
    })
    titleHistory: TitleHistory,
    @param.where(TitleHistory) where?: Where<TitleHistory>,
  ): Promise<Count> {
    return this.titleHistoryRepository.updateAll(titleHistory, where);
  }

  @get('/title-histories/{id}')
  @response(200, {
    description: 'TitleHistory model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TitleHistory, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TitleHistory, {exclude: 'where'}) filter?: FilterExcludingWhere<TitleHistory>
  ): Promise<TitleHistory> {
    return this.titleHistoryRepository.findById(id, filter);
  }

  @patch('/title-histories/{id}')
  @response(204, {
    description: 'TitleHistory PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TitleHistory, {partial: true}),
        },
      },
    })
    titleHistory: TitleHistory,
  ): Promise<void> {
    await this.titleHistoryRepository.updateById(id, titleHistory);
  }

  @put('/title-histories/{id}')
  @response(204, {
    description: 'TitleHistory PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() titleHistory: TitleHistory,
  ): Promise<void> {
    await this.titleHistoryRepository.replaceById(id, titleHistory);
  }

  @del('/title-histories/{id}')
  @response(204, {
    description: 'TitleHistory DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.titleHistoryRepository.deleteById(id);
  }
}

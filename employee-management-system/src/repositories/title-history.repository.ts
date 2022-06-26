import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {TitleHistory, TitleHistoryRelations} from '../models';

export class TitleHistoryRepository extends DefaultCrudRepository<
  TitleHistory,
  typeof TitleHistory.prototype.id,
  TitleHistoryRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(TitleHistory, dataSource);
  }
}

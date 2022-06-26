import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Employee, EmployeeRelations, TitleHistory} from '../models';
import {TitleHistoryRepository} from './title-history.repository';

export class EmployeeRepository extends DefaultCrudRepository<
  Employee,
  typeof Employee.prototype.id,
  EmployeeRelations
> {

  public readonly titleHistories: HasManyRepositoryFactory<TitleHistory, typeof Employee.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('TitleHistoryRepository') protected titleHistoryRepositoryGetter: Getter<TitleHistoryRepository>,
  ) {
    super(Employee, dataSource);
    this.titleHistories = this.createHasManyRepositoryFactoryFor('titleHistories', titleHistoryRepositoryGetter,);
    this.registerInclusionResolver('titleHistories', this.titleHistories.inclusionResolver);
  }
}

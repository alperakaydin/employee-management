import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Location, LocationRelations, Department} from '../models';
import {DepartmentRepository} from './department.repository';

export class LocationRepository extends DefaultCrudRepository<
  Location,
  typeof Location.prototype.name,
  LocationRelations
> {

  public readonly departments: HasManyRepositoryFactory<Department, typeof Location.prototype.name>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('DepartmentRepository') protected departmentRepositoryGetter: Getter<DepartmentRepository>,
  ) {
    super(Location, dataSource);
    this.departments = this.createHasManyRepositoryFactoryFor('departments', departmentRepositoryGetter,);
    this.registerInclusionResolver('departments', this.departments.inclusionResolver);
  }
}

import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'locds',
  connector: 'rest',
  baseURL: 'http://www.locationbox.com.tr/locationbox/services?',
  crud: false
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class LocdsDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'locds';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.locds', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}

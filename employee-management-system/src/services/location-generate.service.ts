import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {LocdsDataSource} from '../datasources';

export interface LocationGenerate {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  getLocation(latitude: string, longtitude: string): Promise<any>;
}

export class LocationGenerateProvider implements Provider<LocationGenerate> {
  constructor(
    // locds must match the name property in the datasource json file
    @inject('datasources.locds')
    protected dataSource: LocdsDataSource = new LocdsDataSource(),
  ) { }

  value(): Promise<LocationGenerate> {
    return getService(this.dataSource);
  }
}



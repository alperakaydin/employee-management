import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Department, Location} from '../models';
import {LocationRepository} from '../repositories';



@injectable({scope: BindingScope.TRANSIENT})
export class GenerateAdressService {
  constructor(
    @repository(LocationRepository)
    public locationRepository: LocationRepository,




  ) { }

  async addressGenerateAndCreateLocation(dep: Department) {
    let depName = dep.location;
    let location: Location;
    let Longitude = 29.13095;
    let Latitude = 40.93351;
    const apiKey = "1730000201000120004700080902020X40741090080050210002069";
    let url = "http://www.locationbox.com.tr/locationbox/services?Key=" + apiKey
      + "&Cmd=Geocode&Typ=JSON&Latitude=" + Latitude + "&Longitude=" + Longitude;
    console.log(url);
    /* console.log(request(url)); */
    /*  http.get
     getService(this.dataSource.connect())
      */




  }
  /*
   * Add service methods here
   */
}

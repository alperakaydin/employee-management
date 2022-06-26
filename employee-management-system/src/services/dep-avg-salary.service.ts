import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Department} from '../models';

@injectable({scope: BindingScope.TRANSIENT})
export class DepAvgSalaryService {
  constructor(/* Add @inject to inject parameters */) { }

  avarageCalculator(dep: Department) {
    let count: number = 0;
    let sum: number = 0;

    dep.employees.forEach(element => {

      count += 1;
      sum += element.salary;

    });

    return sum / count;

  }

  avarageAllDepartmentCalculator(dep: Department) {
    let count: number = 0;
    let sum: number = 0;

    dep.employees.forEach(element => {
      console.log(element.salary);
      count += 1;
      sum += element.salary;

    });

    return sum / count;

  }

  /*
   * Add service methods here
   */
}

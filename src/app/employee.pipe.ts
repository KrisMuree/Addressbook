import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'employeeFilter'
})
export default class EmployeePipe implements PipeTransform {
  transform(value: any, args: string[]): any {
    const filter = args[0];

    if (filter && Array.isArray(value)) {
      const filterKeys = Object.keys(filter);
      return value.filter(item =>
        filterKeys.reduce((memo, keyName) =>
        memo && item[keyName] === filter[keyName], true));
    } else {
      return value;
    }
  }
}

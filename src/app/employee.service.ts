import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Employee} from './models/employee.interface';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class EmployeeService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private employeesUrl = 'api/employees';

  constructor(private http: Http) {}

  getEmployees(): Promise<Array<Employee>> {
    return this.http.get(this.employeesUrl)
      .toPromise()
      .then(response => response.json().data as Array<Employee>)
      .catch(this.handleError);
  };

  getFilteredEmployees(options: any): Promise<Array<Employee>> {
    return this.http.get(`${this.employeesUrl}`)
      .toPromise()
      .then(response => response.json().data as Array<Employee>)
      .then(employees => {
        if (options.lastName === '' && options.firstName === '' && options.department === '') {
          return employees;
        } else {
          return employees
            .filter(e => {
              return (
              (options.lastName !== '' && e.lastName.toLowerCase() === options.lastName.toLowerCase())
              || (options.firstName !== '' && e.firstName.toLowerCase() === options.firstName.toLowerCase())
              || (options.department !== '' && e.department.toLowerCase() === options.department.toLowerCase()));
            });
        }
    });
  };
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  };

  delete(id: number): Promise<void> {
    const url = `${this.employeesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  };

  create(employee: Employee): Promise<Employee> {
    return this.http
      .post(this.employeesUrl, employee, {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Employee)
      .catch(this.handleError);
  };



}


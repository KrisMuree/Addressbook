import { Component, OnInit } from '@angular/core';
import {Employee} from '../models/employee.interface';
import {EmployeeService} from '../employee.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EmployeeComponent} from '../employee/employee.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  public employeeList: Array<Employee>;
  public sortByFlag: boolean;
  public showFilter: boolean;

  constructor(private modalService: NgbModal, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService
        .getEmployees()
        .then(employees => this.employeeList = employees);
  };

  delete(id: number, employee: Employee): void {
    this.employeeService.delete(id)
      .then(() => {
        this.employeeList = this.employeeList.filter(e => e !== employee);
      });
  };

  open() {
    const modalRef = this.modalService.open(EmployeeComponent);
    modalRef.result.then(() => this.loadEmployees());
  }

  filter(lastName: string, firstName: string, department: string): void {
    const options = {lastName: lastName, firstName: firstName, department: department};
    this.employeeService.getFilteredEmployees(options)
      .then(employees => this.employeeList = employees);
  };

  sortBy() {
    this.sortByFlag ? this.sortByAsc() : this.sortByDec();
  };

  sortByAsc() {
    this.employeeList.sort(
      (a, b) => a.lastName.toLowerCase() !== b.lastName.toLowerCase() ? a.lastName.toLowerCase() < b.lastName.toLowerCase() ? -1 : 1 : 0);
  }
  sortByDec() {
    this.employeeList.sort(
      (a, b) => a.lastName.toLowerCase() !== b.lastName.toLowerCase() ? a.lastName.toLowerCase() < b.lastName.toLowerCase() ? 1 : -1 : 0);
  }
}

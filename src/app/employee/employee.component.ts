import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Employee} from '../models/employee.interface';
import {EmployeeService} from '../employee.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  public employee: FormGroup;

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.employee = this.fb.group( {
      firstName: ['', [Validators.required, Validators.maxLength(60)]],
      lastName: ['', [Validators.required, Validators.maxLength(60)]],
      department: ['', [Validators.required, Validators.maxLength(30)]],
      contactNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
    });
  }

  save({ value, valid }: { value: Employee, valid: boolean }): void {
    if (valid) {
      this.employeeService.create(value)
        .then(employee => this.activeModal.close());
    }
  };

  revert() {
    this.employee.reset();
  };

}

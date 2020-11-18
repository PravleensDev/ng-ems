import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { EmployeeDataService } from '../services/employee-data.service';
import { FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';

import { map, startWith } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss'],
})
export class UpdateEmployeeComponent implements OnInit {
  dataLoaded = false;

  userIdAdmin = true;

  visible = true;

  selectable = true;

  removable = true;

  separatorKeysCodes: number[] = [ENTER, COMMA];

  designationList: string[] = [
    'manager',
    'developer',
    'tester',
    'hr',
    'engineer',
    'admin',
  ];

  skillsList: string[] = [];

  dataId: string = '';

  designationDefault = '';

  employeeNameHeading = '';

  updateForm = this._updateFromBuilder.group({
    empId: ['', [Validators.required, Validators.min(0)]],
    empName: ['', [Validators.required, Validators.pattern('[a-zA-z ]*')]],
    empAge: ['', [Validators.required, Validators.min(1)]],
    empEmail: ['', [Validators.required, Validators.email]],
    empPassword: ['', [Validators.required, Validators.minLength(4)]],
    doj: ['', [Validators.required]],
    designationSelected: ['', Validators.required],
    salary: [10_000, [Validators.required, Validators.min(0)]],
    skillsSelected: ['', null],
  });

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _employeeDataService: EmployeeDataService,
    private _updateFromBuilder: FormBuilder,
    private _navigatorRoute: Router,
    private _notificationBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    console.log('init called');
    this._activatedRoute.queryParamMap.subscribe(({ params }: any) => {
      if (params['id']) {
        this._employeeDataService
          .getEmployeeProfile(params['id'])
          .subscribe((employeeData: any) => {
            const {
              id,
              emp_id,
              employee_name,
              employee_salary,
              employee_email,
              employee_password,
              employee_age,
              skills,
              designation,
              DOJ,
            } = employeeData;
            this.dataId = id;
            this.employeeNameHeading = employee_name;
            this.updateForm.patchValue({
              empName: employee_name,
              empId: emp_id,
              doj: this.userIdAdmin
                ? new Date(DOJ)
                : new Date(DOJ).toDateString(),
              skillsSelected: null,
              salary: employee_salary,
              empEmail: employee_email,
              empPassword: employee_password,
              empAge: employee_age,
              designationSelected: designation,
            });

            this.designationDefault = designation.trim();

            this.skillsList = skills;
            this.dataLoaded = true;
          });
      }
    });
    this._employeeDataService
      .getDesignations()
      .subscribe((designationData: any) => {
        this.designationList = designationData;
      });
  }

  removeSkill = (skillToRemove: any) => {
    //console.log(skillToRemove);
    this.skillsList = this.skillsList.filter((skill: any) => {
      if (skill.trim().toLowerCase() !== skillToRemove.trim().toLowerCase())
        return skill;
    });
  };

  addSkill = (event: any) => {
    if (
      event.value &&
      !this.skillsList.includes(event.value.trim().toLowerCase())
    ) {
      this.skillsList.push(event.value);
    }
    this.updateForm.patchValue({
      skillsSelected: null,
    });
  };

  compareDesignation(o1: string, o2: string) {
    if (o1 && o2) {
      return o1.trim().toLowerCase() === o2.trim().toLowerCase();
    }
    return false;
  }

  updateEmployeeData = () => {
    if (this.updateForm.status === 'VALID') {
      this._employeeDataService
        .updateEmployeeProfile(
          new employeeDetails(
            this.dataId,
            this.updateForm.value.empId,
            this.updateForm.value.empName,
            this.updateForm.value.salary,
            this.updateForm.value.empAge,
            this.skillsList,
            this.updateForm.value.designationSelected,
            this.updateForm.value.doj,
            this.updateForm.value.empEmail,
            this.updateForm.value.empPassword
          )
        )
        .subscribe((response: any) => {
          this.showNotification('Employee data updated', 'Ok');
          this.ngOnInit();
        });
    } else {
      alert('Unable update data');
    }
  };

  deteleEmployee = () => {
    console.log('Deleting employee with id', this.dataId);

    if (confirm('Are you sure want to delete this details ?')) {
      this._employeeDataService
        .deleteEmployeeProfile(this.dataId)
        .subscribe((response: any) => {
          console.log(response);
          this.showNotification('Employee data deleted', 'Ok');
          this._navigatorRoute.navigateByUrl('/dashboard');
        });
    }
  };

  showNotification = (message: string, action: string) => {
    this._notificationBar.open(message, action, {
      duration: 5000,
    });
  };
}

class employeeDetails {
  constructor(
    private id: string,
    private emp_id: string,
    private employee_name: string,
    private employee_salary: string,
    private employee_age: string,
    private skills: string[],
    private designation: string,
    private DOJ: string,
    private employee_email: string,
    private employee_password: string
  ) {}
}

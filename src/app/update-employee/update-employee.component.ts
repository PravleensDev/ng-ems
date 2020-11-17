import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { EmployeeDataService } from '../services/employee-data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss'],
})
export class UpdateEmployeeComponent implements OnInit {
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
    empName: ['', null],
    empId: ['', [Validators.min(0)]],
    doj: ['', null],
    designationSelected: ['', null],
    skillsSelected: ['', null],
    salary: [10_000, null],
    empEmail: ['', null],
    empPassword: ['', null],
    empAge: ['', null],
  });

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _employeeDataService: EmployeeDataService,
    private _updateFromBuilder: FormBuilder
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
            });

            this.designationDefault = designation.trim();

            this.skillsList = skills;
          });
      }
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
    // console.log(o1);
    // console.log(o2);
    if (o1 && o2) {
      return o1.trim().toLowerCase() === o2.trim().toLowerCase();
    }
    return false;
  }

  updateEmployeeData = () => {
    console.log('Update form submitted');

    const {
      empName,
      empId,
      doj,
      designationSelected,
      salary,
      empEmail,
      empPassword,
      empAge,
    } = this.updateForm.value;

    //console.log(this.skillsList);

    /*console.log(
      empName,
      empId,
      doj,
      designationSelected,
      salary,
      empEmail,
      empPassword,
      empAge
    );*/

    this._employeeDataService
      .updateEmployeeProfile(
        new employeeDetails(
          this.dataId,
          empId,
          empName,
          salary,
          empAge,
          this.skillsList,
          designationSelected,
          doj,
          empEmail,
          empPassword
        )
      )
      .subscribe((response: any) => {
        alert('Data updated');
        this.ngOnInit();
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

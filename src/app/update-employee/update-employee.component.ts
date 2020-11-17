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
  userIdAdmin = !true;

  visible = true;

  selectable = true;

  removable = false;

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

  designationDefault = '';

  employeeNameHeading = "";

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

  chipColors = ['warn', 'primary', 'accent', ''];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _employeeDataService: EmployeeDataService,
    private _updateFromBuilder: FormBuilder
  ) {}

  changeAdminState = () => {
    this.userIdAdmin = !this.userIdAdmin;
    this.removable = this.userIdAdmin;
    this.ngOnInit();
  };
  ngOnInit(): void {
    console.log('init called');
    this._activatedRoute.queryParamMap.subscribe(({ params }: any) => {
      if (params['id']) {
        this._employeeDataService
          .getEmployeeProfile(params['id'])
          .subscribe((employeeData: any) => {
            const {
              id,
              employee_name,
              employee_salary,
              employee_age,
              skills,
              designation,
              DOJ,
            } = employeeData;

            this.employeeNameHeading = employee_name
            this.updateForm.patchValue({
              empName: employee_name,
              empId: id,
              doj: this.userIdAdmin
                ? new Date(DOJ)
                : new Date(DOJ).toDateString(),
              skillsSelected: null,
              salary: employee_salary,
              empEmail: 'Email.Remaning',
              empPassword: 'Password Remaining',
              empAge: employee_age,
            });

            this.designationDefault = designation.trim().charAt(0).toUpperCase() + designation.slice(2);
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

  getChipColor() {
    const index = Math.round(Math.random() * this.chipColors.length);
    //console.log(this.chipColors[index])
    return this.chipColors[index];
  }

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

  compareDesignation(o1: any, o2: any) {
    // console.log(o1);
    // console.log(o2);
    if (o1 && o2) {
      return o1.trim().toLowerCase() === o2.trim().toLowerCase();
    }
    return false;
  }
}

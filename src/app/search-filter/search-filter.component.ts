import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { EmployeeDataService } from '../services/employee-data.service';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss'],
})
export class SearchFilterComponent implements OnInit {
  @Output() appliedFilterData: EventEmitter<string> = new EventEmitter();

  designationList: string[] = [
    'manager',
    'developer',
    'tester',
    'hr',
    'engineer',
    'admin',
  ];

  skillsList: string[] = [
    'java',
    'python',
    'full stack',
    'sql',
    'mongodb',
    'react',
    'angular',
    'fultter',
    'devops',
    'docker',
    'texting',
  ];

  minSalary: number = 0;

  maxSalary: number = 100_0000;

  salaryInterval: number = 100_000;

  salaryLabelDisplay: any = 'Salary';

  filterFormData = this._filterFormBuilder.group({
    emp_id: ['', [Validators.min(0)]],
    doj: ['', null],
    designationSelected: ['', null],
    skillsSelected: ['', null],
    salary: [10_000, null],
  });

  constructor(
    private _filterFormBuilder: FormBuilder,
    private _employeeDataService: EmployeeDataService
  ) {}

  salaryLabel = (value: number) => {
    if (value >= 1000) {
      const val = Math.round(value / 1000) + 'k';
      return val;
    }
    return value;
  };

  ngOnInit(): void {
    this._employeeDataService.getSkills().subscribe((skillsData: any) => {
      this.skillsList = skillsData;
    });
    this._employeeDataService.getDesignations().subscribe((designationsData: any) =>{
      this.designationList = designationsData;
    })
  }

  pushSelectedFiltersToDashboard = () => {
    //console.log(this.filterFormData)
    this.appliedFilterData.emit(this.filterFormData.value);
  };
}

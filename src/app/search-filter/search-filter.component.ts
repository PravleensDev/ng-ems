import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss'],
})
export class SearchFilterComponent implements OnInit {
  designationSelected = new FormControl();
  skillsSelected = new FormControl();

  designationList = [
    'manager',
    'developer',
    'tester',
    'hr',
    'engineer',
    'admin',
  ];
  skillsList = [
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

  minSalary: number = 10_000;
  maxSalary: number = 100_0000;
  salaryInterval: number = 100000;
  salaryLabelDisplay: any = 'Salary';

  /**
   * [min] = "minSalary" [max] ="maxSalary" [tickInterval] = "salaryInterval" [displayWith] = "salaryLabel"
   */
  constructor() {}

  salaryLabel = (value: number) => {
    if (value >= 1000) {
      const val = Math.round(value / 1000) + 'k';
      value === this.minSalary
      ? (this.salaryLabelDisplay = 'Salary')
      : (this.salaryLabelDisplay = val);
      return val;
    }
    value === this.minSalary
      ? (this.salaryLabelDisplay = 'Salary')
      : (this.salaryLabelDisplay = value);

    return value;
  };
  ngOnInit(): void {}
}

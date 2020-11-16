import { Component, OnInit } from '@angular/core';
import { EmployeeDataService } from '../services/employee-data.service';
import { Observable, throwError } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public employeeArray: any = [];

  public dataLoading: boolean = true;

  nameSearchForm = this._searchFormBuilder.group({
    searchedEmployeeName: ['', Validators.required],
  });

  constructor(
    private _employeeDataProvider: EmployeeDataService,
    private _searchFormBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this._employeeDataProvider.getEmployeeData().subscribe((data) => {
      this.dataLoading = false;
      this.employeeArray = data;
    });
  }

  getSelectedFilters = (event: string) => {
    console.log(event);
    /**
     * Sliced the data(employeeArray) just to test the
     * apply filter event emitted by search-filter
     * component
     */
    this.employeeArray = this.employeeArray.slice(0, 1);
  };

  searchByEmployeeName = () => {
    console.log(this.nameSearchForm.value);
  };
}

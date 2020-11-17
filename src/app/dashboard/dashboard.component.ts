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

  employeeArrayBackup: any = [];

  tempEmployeeArrayForFiltering: any = [];

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
      this.employeeArrayBackup = data;
    });
  }

  filterByDoj(startDoj: Date) {
    //console.log(startDoj);
    const dayDate = startDoj.getDate();
    const monthNumber = startDoj.getMonth();
    const yearNumber = startDoj.getFullYear();
    this.tempEmployeeArrayForFiltering = this.tempEmployeeArrayForFiltering.filter(
      (data: any) => {
        const dataDoj = new Date(data.DOJ);

        if (
          dayDate <= dataDoj.getDate() &&
          monthNumber <= dataDoj.getMonth() &&
          yearNumber <= dataDoj.getFullYear()
        ) {
          return data;
        }
      }
    );
  }

  filterBySkills(skillsSelected: string[]) {
    let tempArray: any[] = [];
    skillsSelected.forEach((skills: string) => {
      tempArray = tempArray.concat(
        this.tempEmployeeArrayForFiltering.filter((data: any) => {
          if (data.skills.includes(' ' + skills)) {
            return data;
          }
        })
      );
    });
    console.log(tempArray);
    this.tempEmployeeArrayForFiltering = tempArray;
  }

  filterByDesignation(designationSelected: string[]) {
    let tempArray: any[] = [];
    designationSelected.forEach((designation: string) => {
      tempArray = tempArray.concat(
        this.tempEmployeeArrayForFiltering.filter((data: any) => {
          if (
            data.designation.trim().toLowerCase() ===
            designation.trim().toLowerCase()
          ) {
            return data;
          }
        })
      );
    });
    this.tempEmployeeArrayForFiltering = tempArray;
  }

  filterByid(id: String) {
    this.tempEmployeeArrayForFiltering = this.tempEmployeeArrayForFiltering.filter(
      (val: any) => {
        //console.log(val);
        if (val.emp_id.toString() === id.toString()) {
          return val;
        }
      }
    );
  }

  filterBySalary(startSalary: number) {
    this.tempEmployeeArrayForFiltering = this.tempEmployeeArrayForFiltering.filter(
      (data: any) => {
        if (data.employee_salary >= startSalary) {
          return data;
        }
      }
    );
  }

  getSelectedFilters = (event: any) => {
    this.employeeArray = this.employeeArrayBackup;
    this.tempEmployeeArrayForFiltering = this.employeeArray;
    const { emp_id, doj, designationSelected, skillsSelected, salary } = event;

    let employeeDataChanged = false;
    if (emp_id.toString() !== '' && emp_id.toString() !== null) {
      this.filterByid(emp_id);
      employeeDataChanged = true;
    }
    if (doj !== '' && doj !== null) {
      this.filterByDoj(doj);
      employeeDataChanged = true;
    }
    if (designationSelected !== '' && designationSelected !== null) {
      this.filterByDesignation(designationSelected);
      employeeDataChanged = true;
    }
    if (skillsSelected !== '' && skillsSelected !== null) {
      this.filterBySkills(skillsSelected);
      employeeDataChanged = true;
    }
    if (salary !== 0 && salary !== '' && salary !== null) {
      this.filterBySalary(salary);
      employeeDataChanged = true;
    }
    if (employeeDataChanged)
      this.employeeArray = this.tempEmployeeArrayForFiltering;
  };

  searchByEmployeeName = () => {
    const employeeNameToSearch = this.nameSearchForm.value.searchedEmployeeName;
    if (employeeNameToSearch) {
      this.employeeArray = this.employeeArrayBackup;

      this.employeeArray = this.employeeArray.filter((data: any) => {
        if (
          data.employee_name.toLowerCase().trim().replace(' ', '') ===
          employeeNameToSearch.toLowerCase().trim().replace(' ', '')
        ) {
          return data;
        }
      });
    }
  };
}

import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class EmployeeDataService {
  private baseUrl = 'http://localhost:3000/data';

  constructor(private _http: HttpClient) {}

  getEmployeeData = () => {
    return this._http.get(this.baseUrl);
  };

  getEmployeeProfile = (employeeId: number) => {
    // console.log('Get request for employee profile with id ' + employeeId);
    return this._http.get(this.baseUrl + '/' + employeeId);
  };

  updateEmployeeProfile = (updatedData: any) => {
    //console.log(updatedData);
    return this._http.put(this.baseUrl + '/' + updatedData.id, updatedData);
  };
}

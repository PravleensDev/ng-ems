import { Component,  OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public employeeArray:any = [];
  constructor() {
    for(let i=0 ;i< 10; i++){
      this.employeeArray.push(i);
    }
   }

  ngOnInit(): void {
  }

}



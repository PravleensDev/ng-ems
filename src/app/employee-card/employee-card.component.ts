
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss'],
})
export class EmployeeCardComponent implements OnInit {
  @Input() data: any;
  monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  constructor() {}

  ngOnInit(): void {
    console.log('Data received in card component');
    //console.log(this.data);
  }

  getFormattedSalary = (salaryValue: number): string =>
    salaryValue > 1000
      ? Math.round(salaryValue / 1000) + 'k'
      : salaryValue + 'k';

  getMonthName(monthNumber: number): string {
    if (monthNumber >= 0 && monthNumber <= 11) {
      return this.monthNames[monthNumber];
    }
    return 'Wrong month';
  }
  getFormattedDoj = (date: string): string => {
    const parsedDate = Date.parse(date);
    if(parsedDate){
      //console.log(parsedDate)
      const newDate = new Date(parsedDate);
      const dayDate = newDate.getDate();
      const monthName = this.getMonthName(newDate.getMonth());
      const year = newDate.getFullYear();
      return `${dayDate}, ${monthName} ${year}`;
    }
    
    return "Working"
  };
}

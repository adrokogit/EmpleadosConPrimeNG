import { Component } from '@angular/core';
import { Employee } from '../../model/Employee';

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrl: './employees-table.component.scss'
})
export class EmployeesTableComponent {

  employees: Employee[] = [
    new Employee("John", "Doe", "john.doe@example.com", 3000, true, new Date(1990, 5, 15)),
    new Employee("Jane", "Smith", "jane.smith@example.com", 3500, true, new Date(1985, 10, 22)),
    new Employee("Michael", "Johnson", "michael.johnson@example.com", 4000, false, new Date(1992, 3, 10)),
    new Employee("Emily", "Davis", "emily.davis@example.com", 3200, true, new Date(1988, 7, 5)),
    new Employee("Chris", "Brown", "chris.brown@example.com", 2800, true, new Date(1995, 1, 17)),
    new Employee("Jessica", "Miller", "jessica.miller@example.com", 4500, false, new Date(1983, 9, 30)),
    new Employee("Daniel", "Wilson", "daniel.wilson@example.com", 3300, true, new Date(1991, 11, 8)),
    new Employee("Sarah", "Moore", "sarah.moore@example.com", 3700, true, new Date(1986, 4, 25)),
    new Employee("David", "Taylor", "david.taylor@example.com", 3100, false, new Date(1993, 6, 12)),
    new Employee("Laura", "Anderson", "laura.anderson@example.com", 3900, true, new Date(1987, 2, 28))
];


editEmployee(employee: Employee): void {
  // Implement editEmployee method  
  }

deleteEmployee(employee: Employee): void {
  // Implement deleteEmployee method
  }

}

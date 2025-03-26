import { Component, OnInit } from '@angular/core';
import { Employee } from '../../model/Employee';
import { EmployeesService } from '../employees.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrl: './employees-table.component.scss'
})
export class EmployeesTableComponent implements OnInit{
  

  employees: Employee[] = [];

  constructor(private employeesService:EmployeesService, private router:Router){

  }

  ngOnInit(): void {
    this.employeesService.getEmployees().subscribe(employees => this.employees = employees);
  }

  modifyEmployee(employeeID: string){
    this.router.navigate(['/modifyemployee', employeeID]);
  }

  inactivateEmployee(employeeID: string): void {
    this.employeesService.inactivateEmployee(employeeID);
    console.log('Employee inactivated: '+employeeID);
  }

}

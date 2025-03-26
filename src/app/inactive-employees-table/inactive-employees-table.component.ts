import { Component, OnInit } from '@angular/core';
import { Employee } from '../../model/Employee';
import { EmployeesService } from '../employees.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inactive-employees-table',
  templateUrl: './inactive-employees-table.component.html',
  styleUrl: './inactive-employees-table.component.scss'
})
export class InactiveEmployeesTableComponent {
  employees: Employee[] = [];

  constructor(private employeesService:EmployeesService, private router:Router){

  }

  ngOnInit(): void {
    this.employeesService.getEmployees().subscribe(employees => this.employees = employees);
  }

  modifyEmployee(employeeID: string){
    this.router.navigate(['/modifyemployee', employeeID]);
  }

  activateEmployee(employeeID: string): void {
    this.employeesService.activateEmployee(employeeID);
  }
}

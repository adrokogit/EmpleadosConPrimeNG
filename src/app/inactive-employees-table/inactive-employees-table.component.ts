import { Component, OnInit } from '@angular/core';
import { Employee } from '../../model/Employee';
import { EmployeesService } from '../employees.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-inactive-employees-table',
  templateUrl: './inactive-employees-table.component.html',
  styleUrl: './inactive-employees-table.component.scss'
})
export class InactiveEmployeesTableComponent {
  employees: Employee[] = [];

  constructor(private employeesService:EmployeesService, private router:Router,private messageService: MessageService){

  }

  ngOnInit(): void {
    this.employeesService.getEmployees().subscribe(employees => this.employees = employees);
  }

  modifyEmployee(employeeID: string){
    this.router.navigate(['/modifyemployee', employeeID]);
  }

  activateEmployee(employeeID: string): void {
    this.employeesService.activateEmployee(employeeID);
    this.employeesService.getEmployeeById(employeeID).subscribe(employee=>{
      this.showToast(employee.getFullName());
    });
  }

  showToast(fullName:string) { 
    this.messageService.add({severity: 'success', summary:  fullName+'  Activado', detail: 'Se ha completado la acción correctamente.' });
  }

  getEmployees(){
    return this.employees.filter(employee => !employee.active).slice().reverse();
  }
}

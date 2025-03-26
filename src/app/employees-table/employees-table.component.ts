import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Employee } from '../../model/Employee';
import { EmployeesService } from '../employees.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrl: './employees-table.component.scss'
})
export class EmployeesTableComponent implements OnInit{
  

  employees: Employee[] = [];

  constructor(private employeesService:EmployeesService, private router:Router, private messageService: MessageService, private cdr: ChangeDetectorRef){

  }

  ngOnInit(): void {
    this.employeesService.getEmployees().subscribe(employees => this.employees = employees);
  }

  modifyEmployee(employeeID: string){
    this.router.navigate(['/modifyemployee', employeeID]);
  }

  inactivateEmployee(employeeID: string): void {
    this.employeesService.inactivateEmployee(employeeID);
    
    this.employeesService.getEmployeeById(employeeID).subscribe(employee=>{
      this.showToast(employee.getFullName());
       });
  }

  showToast(fullName:string) { 
    this.messageService.add({severity: 'success', summary:  fullName+' Inactivado', detail: 'Se ha completado la acción correctamente.' });
  }

  getEmployees(){
    return this.employees.filter(employee => employee.active).slice().reverse();
  }
}

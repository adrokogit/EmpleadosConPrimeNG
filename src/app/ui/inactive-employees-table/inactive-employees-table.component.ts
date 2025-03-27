import { Component, OnInit } from '@angular/core';
import { EmployeeDTO } from '../../model/dto/employee.DTO';
import { EmployeesService } from '../../services/employees.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { EmployeeModel } from '../../model/employee.model';

@Component({
  selector: 'app-inactive-employees-table',
  templateUrl: './inactive-employees-table.component.html',
  styleUrl: './inactive-employees-table.component.scss'
})
export class InactiveEmployeesTableComponent {
  constructor(private employeesService:EmployeesService, private router:Router,private messageService: MessageService, private employeeModel: EmployeeModel){

  }

  ngOnInit(): void {
    this.employeesService.getEmployees()
  }

  modifyEmployee(employeeID: string){
    this.router.navigate(['/modifyemployee', employeeID]);
  }

  activateEmployee(employeeID: string): void {
    this.employeesService.activateEmployee(employeeID);
    this.employeesService.getEmployees();
  }

  showToast(fullName:string) { 
    this.messageService.add({severity: 'success', summary:  fullName+'  Activado', detail: 'Se ha completado la acción correctamente.' });
  }

  getEmployees(){
    return this.employeeModel.inactiveEmployees.slice().reverse();
  }
}

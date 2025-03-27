import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EmployeeDTO } from '../../model/dto/employee.DTO';
import { EmployeesService } from '../../services/employees.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { EmployeeModel } from '../../model/employee.model';

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrl: './employees-table.component.scss'
})
export class EmployeesTableComponent implements OnInit{
  
  constructor(private employeesService:EmployeesService, private router:Router, private messageService: MessageService, private employeeModel: EmployeeModel){

  }

  ngOnInit(): void {
    this.employeesService.getEmployees();
  }

  modifyEmployee(employeeID: string){
    this.router.navigate(['/modifyemployee', employeeID]);
  }

  inactivateEmployee(employeeID: string): void {
    this.employeesService.inactivateEmployee(employeeID);
    this.employeesService.getEmployees();
  }

  showToast(fullName:string) { 
    this.messageService.add({severity: 'success', summary:  fullName+' Inactivado', detail: 'Se ha completado la acción correctamente.' });
  }

  getEmployees(){
    return this.employeeModel.activeEmployees.slice().reverse();
  }
}

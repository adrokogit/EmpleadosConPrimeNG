/**
 * @file employees-table.component.ts
 * @author Adrián Fernández Álvarez
 * @description This file contains the logic of the employees table component
 * @version 1.0.0
 * @since 27/03/2025
 */

import { Component, OnInit } from '@angular/core';
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
  /**
   * Initializes the component
   */
  ngOnInit(): void {
    this.employeesService.getEmployees();
  }
  /**
   * It is called when the user clicks on the modify button and redirects to the modify employee page
   * @param employeeID 
   */
  modifyEmployee(employeeID: string){
    this.router.navigate(['/modifyemployee', employeeID]);
  }

  /**
   * It is called when the user clicks on the activate button and inactivates the employee
   * @param employeeID 
   */
  inactivateEmployee(employeeID: string): void {
    this.employeesService.inactivateEmployee(employeeID);
    this.employeesService.getEmployees();
    this.showToast(this.employeesService.getEmployeeById(employeeID).getFullName());
  }
  /**
   * Shows a toast with the employee name
   * @param fullName 
   */
  showToast(fullName:string) { 
    this.messageService.add({severity: 'success', summary:  fullName+' Inactivado', detail: 'Se ha completado la acción correctamente.' });
  }
  /**
   * 
   * @returns list of active employees in reverse for the table
   */
  getEmployees(){
    return this.employeeModel.activeEmployees.slice().reverse();
  }
}

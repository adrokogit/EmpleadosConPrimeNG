/**
 * @file inactive-employees-table.component.ts
 * @author Adrián Fernández Álvarez
 * @description This file contains the component that displays the inactive employees table
 * @version 1.0.0
 * @since 27/03/2025
 */

import { Component, OnInit } from '@angular/core';
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

  /**
   * Initializes the component
   */
  ngOnInit(): void {
    this.employeesService.getEmployees()
  }

  /**
   * It is called when the user clicks on the modify button and redirects to the modify employee page
   * @param employeeID 
   */
  modifyEmployee(employeeID: string){
    this.router.navigate(['/modifyemployee', employeeID]);
  }

  /**
   * It is called when the user clicks on the activate button and activates the employee
   * @param employeeID 
   */
  activateEmployee(employeeID: string): void {
    this.employeesService.activateEmployee(employeeID);
    this.employeesService.getEmployees();
  }

  /**
   * Shows a toast with the employee name
   * @param fullName 
   */
  showToast(fullName:string) { 
    this.messageService.add({severity: 'success', summary:  fullName+'  Activado', detail: 'Se ha completado la acción correctamente.' });
  }

  /**
   * 
   * @returns list of inactive employees in reverse for the table
   */
  getEmployees(){
    return this.employeeModel.inactiveEmployees.slice().reverse();
  }
}

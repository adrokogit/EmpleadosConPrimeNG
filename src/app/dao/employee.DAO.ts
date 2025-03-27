/**
 * @file employee.DAO.ts
 * @author Adrián Fernández Álvarez
 * @description This file contains the DAO class for the employee entity
 * @version 1.0.0
 * @since 27/03/2025
 */


import { Injectable } from '@angular/core';
import { EmployeeDTO } from '../model/dto/employee.DTO';
import { MockedAPI } from './MockedAPI';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDAO {
  /**
   * API instance
   */
  private api:MockedAPI = new MockedAPI();

  /**
   * 
   * @returns employees in format Any[]
   */
  getEmployees():any[]{
    return this.api.getEmployees();
  }

  /**
   * Updates employee information
   * @param employee 
   * @returns 1 if the employee was updated, -1 if the employee was not found
   */
  updateEmployee(employee: EmployeeDTO){
    return this.api.updateEmployee(employee);
  }
  
  /**
   * Adds employee
   * @param employee 
   */
  createEmployee(employee: EmployeeDTO){
    this.api.createEmployee(employee);
  }

  /**
   * Deletes employee by id
   * @param employeeID 
   * @returns 1 if the employee was deleted, -1 if the employee was not found
   */
  deleteEmployee(employeeID: string){
    return this.api.deleteEmployee(employeeID);
  }

  /**
   * 
   * @param employeeID 
   * @returns employee that matches the id
   */
  getEmployeeById(employeeID: string){
    return this.api.getEmployeeById(employeeID);
  }


}



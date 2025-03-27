/**
 * @file employees.service.ts
 * @author Adrián Fernández Álvarez
 * @description This file contains the service that manages the employees
 * @version 1.0.0
 * @since 27/03/2025
 */

import { Injectable } from '@angular/core';
import { EmployeeDTO } from '../model/dto/employee.DTO';
import { EmployeeDAO } from '../dao/employee.DAO';
import { EmployeeModel } from '../model/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  
  /**
   * @param employeeDAO auto injected
   * @param employeeModel auto injected
   */
  constructor(private employeeDAO: EmployeeDAO, private employeeModel: EmployeeModel) { 
  }

  /**
   * Gets employees from the DAO and updates the model data
   */
  getEmployees(){
    let temp:EmployeeDTO[] = this.transformEmployees(this.employeeDAO.getEmployees());   
    this.employeeModel.employees =  temp;
    this.employeeModel.activeEmployees = temp.filter(employee => employee.active);
    this.employeeModel.inactiveEmployees = temp.filter(employee => !employee.active); 
  }

  /**
   * Creates an employee
   * @param employee employee to be created
   */
  createEmployee(employee: EmployeeDTO){
    this.employeeDAO.createEmployee(employee);
    
  }

  /**
   * Inactivates an employee
   * @param employeeID 
   */
  inactivateEmployee(employeeID: string){
    let employee = this.getEmployeeById(employeeID);

    employee.active = false;
    this.employeeDAO.updateEmployee(employee);
  }

  /**
   * Activates an employee
   * @param employeeID 
   */
  activateEmployee(employeeID: string){
    let employee = this.getEmployeeById(employeeID);
    employee.active = true;
    this.employeeDAO.updateEmployee(employee); 
  }

  /**
   * 
   * @param employeeID 
   * @returns employee that matches the id
   */
  getEmployeeById(employeeID: string){
    let employee = this.employeeDAO.getEmployeeById(employeeID);
    return this.parseEmployee(employee);
  }

  /**
   * Updates the employee information
   * @param employee 
   */
  modifyEmployee(employee: EmployeeDTO){ 
    this.employeeDAO.updateEmployee(employee);
  }

  /**
   * Parses a list of Any into a list of EmployeeDTO
   * @param employees in format Any[]
   * @returns employees in format EmployeeDTO[]
   */
  private transformEmployees(employees: any[]): EmployeeDTO[]{
    let temp:EmployeeDTO[] = [];
    let i = 0;
    while(employees[i] != undefined){
      temp.push( this.parseEmployee(employees[i]));
      i++;
      
    }
    return temp;
  }

  /**
   * Parses an Any to an EmployeeDTO
   * @param employee in format Any
   * @returns employee in format EmployeeDTO
   */
 private parseEmployee(employee: any): EmployeeDTO{ 
  return new EmployeeDTO(employee.id, employee.name, employee.lastName, employee.email, Number(employee.salary), employee.active=='true'?true:false, new Date(employee.birthDate));
 }

}



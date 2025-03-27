import { Injectable } from '@angular/core';
import { EmployeeDTO } from '../model/dto/employee.DTO';
import { EmployeeDAO } from '../dao/employee.DAO';
import { EmployeeModel } from '../model/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  
  constructor(private employeeDAO: EmployeeDAO, private employeeModel: EmployeeModel) { 
  }

  getEmployees(){
    let temp:EmployeeDTO[] = this.transformEmployees(this.employeeDAO.getEmployees());   
    this.employeeModel.employees =  temp;
    this.employeeModel.activeEmployees = temp.filter(employee => employee.active);
    this.employeeModel.inactiveEmployees = temp.filter(employee => !employee.active); 
  }

  createEmployee(employee: EmployeeDTO){
    this.employeeDAO.createEmployee(employee);
    
  }

  inactivateEmployee(employeeID: string){
    let employee = this.getEmployeeById(employeeID);

    employee.active = false;
    this.employeeDAO.updateEmployee(employee);


  }

  activateEmployee(employeeID: string){
    let employee = this.getEmployeeById(employeeID);
    employee.active = true;
    this.employeeDAO.updateEmployee(employee);
    
  }

  getEmployeeById(employeeID: string){
    let employee = this.employeeDAO.getEmployeeById(employeeID);
    return this.parseEmployee(employee);
  }

  modifyEmployee(employee: EmployeeDTO){ 
    this.employeeDAO.updateEmployee(employee);
  }

  private transformEmployees(employees: any[]): EmployeeDTO[]{
    let temp:EmployeeDTO[] = [];
    let i = 0;
    while(employees[i] != undefined){
      temp.push( this.parseEmployee(employees[i]));
      i++;
      
    }
    return temp;
  }
  
 private parseEmployee(employee: any): EmployeeDTO{ 
  return new EmployeeDTO(employee.id, employee.name, employee.lastName, employee.email, Number(employee.salary), employee.active=='true'?true:false, new Date(employee.birthDate));
 }

}



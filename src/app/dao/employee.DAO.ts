import { Injectable } from '@angular/core';
import { EmployeeDTO } from '../model/dto/employee.DTO';
import { MockedAPI } from './MockedAPI';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDAO {
  
  private api:MockedAPI = new MockedAPI();

  getEmployees():any[]{
    return this.api.getEmployees();
  }

  updateEmployee(employee: EmployeeDTO){
    return this.api.updateEmployee(employee);
  }

  createEmployee(employee: EmployeeDTO){
    this.api.createEmployee(employee);
  }

  deleteEmployee(employeeID: string){
    return this.api.deleteEmployee(employeeID);
  }

  getEmployeeById(employeeID: string){
    return this.api.getEmployeeById(employeeID);
  }


}



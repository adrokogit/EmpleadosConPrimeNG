import { Injectable } from '@angular/core';
import { Employee } from '../model/Employee';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private employees: Employee[] = [];
  
  constructor() { 
    this.employees = this.generateEmployees();
  }

  generateEmployees(){
    let employees: Employee[] = [];
    for(let i=0; i<40; i++){
      let employee: Employee = new Employee(this.generateUUID(),"Name"+i, "Lastname"+i, "email"+i+"@test.com", 2000+100*i, i%2==0, new Date(1990+i%10, i%12, i%28));
      employees.push(employee);
    }
    return employees;
  }
  getEmployees(){
    return of(this.employees);
  }
  getActiveEmployees(){
    return of(this.employees.filter(employee => employee.active));
  }

  getInactiveEmployees(){
    return of(this.employees.filter(employee => !employee.active));
  }

  createEmployee(employee: Employee){
    employee.id = this.generateUUID();
    this.employees.push(employee);
    
  }

  inactivateEmployee(employeeID: string){
    let employee = this.employees.find(employee => employee.id == employeeID);
    if(employee){
      employee.active = false;
    }
  }

  activateEmployee(employeeID: string){
    let employee = this.employees.find(employee => employee.id == employeeID);
    if(employee){
      employee.active = true;
    }
  }

  getEmployeeById(employeeID: string){
    let employee = this.employees.find(employee => employee.id == employeeID);
    if(!employee){
      return of(new Employee('','','','',0,false,new Date()));
    }
    return of(new Employee(employee.id,employee.name,employee.lastName,employee.email,employee.salary,employee.active,employee.birthDate));
  }

  modifyEmployee(employee: Employee){ 
    let index = this.employees.findIndex(e => e.id == employee.id);
    if(index != -1){
      this.employees[index] = employee;
    }
  }

  generateUUID(): string {
    return crypto.randomUUID();
  }
}



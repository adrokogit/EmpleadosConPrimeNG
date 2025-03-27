import { enableProdMode, Injectable } from '@angular/core';
import { EmployeeDTO } from '../model/dto/employee.DTO';

export class MockedAPI {

    private employees: any[];

    constructor() { 
        this.employees = this.generateEmployees();
    
    }

    getEmployees():any[]{
        return {... this.employees};
    }

    updateEmployee(employee: EmployeeDTO):number{
        let index = this.employees.findIndex(e => e.id == employee.id);

        if(index != -1){
            this.employees[index] = this.parseEmployeeToAny(employee);
            return 1;
            
        }
        return -1;
    }
    

    createEmployee(employee: EmployeeDTO){
        employee.id = this.generateUUID();
        this.employees.push(this.parseEmployeeToAny(employee));
    }

    deleteEmployee(employeeID: string):number{
        let index = this.employees.findIndex(e => e.id == employeeID);
        if(index != -1){
            this.employees.splice(index,1);
            return 1;
        }
        return -1;
    }

    getEmployeeById(employeeID: string):any{
        let index = this.employees.findIndex(e => e.id == employeeID);
        if(index != -1){
            return this.employees[index];
        }
        return -1;
    }


    private generateEmployees(){
        let employees: any[] = [];
        for(let i=0; i<40; i++){
        let employee ={
            id: this.generateUUID(),
            name:"Name"+i, 
            lastName: "Lastname"+i, 
            email: "email"+i+"@test.com", 
            salary: 2000+100*i+"",
            active: i%2==0?"true":"false", 
            birthDate: 1990+i%10+'/'+i%12+'/'+ i%28,
            };
        employees.push(employee);
        }
        return employees;
    }

    private generateUUID(): string {
        return crypto.randomUUID();
      }

    private parseEmployeeToAny(employee: EmployeeDTO): any{
        return {
            id: employee.id,
            name: employee.name,
            lastName: employee.lastName,
            email: employee.email,
            salary: employee.salary+"",
            active: employee.active? "true":"false",
            birthDate: employee.birthDate
        };
    }
}



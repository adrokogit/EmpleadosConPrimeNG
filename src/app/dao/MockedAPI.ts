/**
 * @file MockedAPI.ts
 * @author Adrián Fernández Álvarez
 * @description This file contains the class that simulates the API
 * @version 1.0.0
 * @since 27/03/2025
 */

import { EmployeeDTO } from '../model/dto/employee.DTO';
export class MockedAPI {
    /**
     * List of employees
     */
    private employees: any[];

    constructor() { 
        this.employees = this.generateEmployees();
    
    }

    /**
     * 
     * @returns copy of the employees list
     */
    getEmployees():any[]{
        return {... this.employees};
    }

    /**
     * Updates all employee information matching id
     * @param employee 
     * @returns 1 if the employee was updated, -1 if the employee was not found
     */
    updateEmployee(employee: EmployeeDTO):number{
        let index = this.employees.findIndex(e => e.id == employee.id);

        if(index != -1){
            this.employees[index] = this.parseEmployeeToAny(employee);
            return 1;
            
        }
        return -1;
    }
    
    /**
     * Adds the employee to the list of employees
     * @param employee 
     */
    createEmployee(employee: EmployeeDTO){
        employee.id = this.generateUUID();
        this.employees.push(this.parseEmployeeToAny(employee));
    }

    /**
     * Deletes the employee with the given id
     * @param employeeID 
     * @returns 1 if the employee was deleted, -1 if the employee was not found
     */
    deleteEmployee(employeeID: string):number{
        let index = this.employees.findIndex(e => e.id == employeeID);
        if(index != -1){
            this.employees.splice(index,1);
            return 1;
        }
        return -1;
    }

    /**
     * 
     * @param employeeID 
     * @returns the employee that matches the id
     */
    getEmployeeById(employeeID: string):any{
        let index = this.employees.findIndex(e => e.id == employeeID);
        if(index != -1){
            return this.employees[index];
        }
        return -1;
    }

    /**
     * 
     * @returns a list of 40 test employees
     */
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

    /**
     * 
     * @returns a random UUID
     */
    private generateUUID(): string {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    /**
     * @param employee 
     * @returns employee in the format of the API
     */
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



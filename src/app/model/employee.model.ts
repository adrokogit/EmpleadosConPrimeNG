/**
 * @file employee.model.ts
 * @author Adrián Fernández Álvarez
 * @description This file contains employee data used by components and updated by EmployeeService
 * @version 1.0.0
 * @since 27/03/2025
 */

import { Injectable } from "@angular/core";
import { EmployeeDTO } from "./dto/employee.DTO";

@Injectable({
    providedIn: 'root'
})
export class EmployeeModel{
    /**
     * List of employees with active == true
     */
    activeEmployees: EmployeeDTO[] = [];
    /**
     * List of employees with active == false
     */
    inactiveEmployees: EmployeeDTO[] = [];
    /**
     * List of all employees
     */
    employees: EmployeeDTO[] = [];
}
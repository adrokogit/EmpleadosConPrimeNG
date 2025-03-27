/**
 * @file employee.DTO.ts
 * @author Adrián Fernández Álvarez
 * @description This file contains the DTO class for the employee entity
 * @version 1.0.0
 * @since 27/03/2025
 */

export class EmployeeDTO {
    id:string;
    name: string;
    lastName: string;
    email: string;
    salary: number;
    active: boolean;
    birthDate: Date;

    constructor(
        id:string,
        name: string,
        lastName: string,
        email: string,
        salary: number,
        active: boolean,
        birthDate: Date
    ) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.salary = salary;
        this.active = active;
        this.birthDate = birthDate;
    }

    /**
     * 
     * @returns the full name of the employee
     */
    getFullName(): string {
        return `${this.name} ${this.lastName}`;
    }

    /**
     * 
     * @returns salary * 12
     */
    getAnnualSalary(): number {
        return this.salary * 12;
    }
}
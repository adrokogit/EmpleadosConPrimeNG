import { EmployeesService } from "../../services/employees.service";

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

    
    getFullName(): string {
        return `${this.name} ${this.lastName}`;
    }

    getAnnualSalary(): number {
        return this.salary * 12;
    }
}
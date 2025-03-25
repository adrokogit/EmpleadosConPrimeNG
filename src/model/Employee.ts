export class Employee {
    name: string;
    lastName: string;
    email: string;
    salary: number;
    isActive: boolean;
    birthDate: Date;

    constructor(
        name: string,
        lastName: string,
        email: string,
        salary: number,
        isActive: boolean,
        birthDate: Date
    ) {
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.salary = salary;
        this.isActive = isActive;
        this.birthDate = birthDate;
    }

    getFullName(): string {
        return `${this.name} ${this.lastName}`;
    }

    getAnnualSalary(): number {
        return this.salary * 12;
    }
}
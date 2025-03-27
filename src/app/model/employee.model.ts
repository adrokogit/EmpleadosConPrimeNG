import { Injectable } from "@angular/core";
import { EmployeeDTO } from "./dto/employee.DTO";

@Injectable({
    providedIn: 'root'
})
export class EmployeeModel{
    activeEmployees: EmployeeDTO[] = [];
    inactiveEmployees: EmployeeDTO[] = [];
    employees: EmployeeDTO[] = [];
}
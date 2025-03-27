/**
 * @file new-employee.component.ts
 * @author Adrián Fernández Álvarez
 * @description NewEmployeeComponent class that handles the new employee and modifying employee form
 * @version 1.0.0
 * @since 27/03/2025
 */

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeesService } from '../../services/employees.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeDTO } from '../../model/dto/employee.DTO';
import { dateBeforeTodayValidator } from './date-validators'; // Importa el validador personalizado
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss']
})
export class NewEmployeeComponent{
  /**
   * Array of active options
   */
  activeOptions: any[] = [{ label: 'Activo', value: true }, { label: 'Inactivo', value: false }];
  /**
   * Form group for the new employee form with validators
   */
  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    salary: new FormControl('', [Validators.required, Validators.min(0)]),
    date: new FormControl(null, [Validators.required, dateBeforeTodayValidator]),
    active: new FormControl(false, Validators.required),
  });
  /**
   * Actual id of the employee.
   * If it is empty, it is a new employee. If it is not, it is a modification
   */
  id: string = "";

  /**
   * Constructor of the NewEmployeeComponent, verifies if the id is in the route and sets it to de 'id' variable
   * @param employeesService autoinjected
   * @param router autoinjected
   * @param route autoinjected
   * @param messageService autoinjected
   */
  constructor(private employeesService: EmployeesService, private router: Router, private route: ActivatedRoute,private messageService: MessageService) { 
    if (this.route.snapshot.params['id']) { 
      this.id = this.route.snapshot.params['id'];
    }    
  }

  /**
   * Initializes the component by setting the previous values if it is a modification
   */
  ngOnInit(): void {
    if (this.id) {
      this.setPreviousEmployeeValues();
    }
  }

  /**
   * It is called when the user clicks on create button.
   * Creates the employee and navigates to the active or inactive employees page depending on the active value
   */
  createEmployee() {
    if (this.formGroup.valid) {
      const employee = this.createEmployeeFromForm('');
      this.employeesService.createEmployee(employee);

      this.messageService.add({severity: 'success', summary: 'Empleado creado', detail: `El empleado ${employee.getFullName()} ha sido creado correctamente` });


      this.router.navigate([employee.active ? '/' : '/inactive']);
    }
  }

  /**
   * It is called when the user clicks on modify button.
   * Modifies the employee and navigates to the active or inactive employees page depending on the active value
   */
  modifyEmployee() {
    if (this.formGroup.valid) {
      const employee = this.createEmployeeFromForm(this.id);

      this.employeesService.modifyEmployee(employee);

      this.messageService.add({severity: 'success', summary: 'Empleado modificado', detail: `El empleado ${employee.getFullName()} ha sido modificado correctamente` });


      this.router.navigate([employee.active ? '/' : '/inactive']);
    }
  }

  /**
   * Sets the previous values of the employee in the form
   */
  setPreviousEmployeeValues() {
    let employee = this.employeesService.getEmployeeById(this.id);
    const formValues = {
      name: employee.name,
      lastName: employee.lastName,
      email: employee.email,
      salary: employee.salary,
      date: employee.birthDate,
      active: employee.active
    };
    this.changeFormValues(formValues);
  }

  /**
   * Changes form values in runtime
   * @param newValues 
   */
  changeFormValues(newValues: any) {
    this.formGroup.patchValue(newValues);
  }
  
  /**
   * Creates an employee with the form information
   * @param id 
   * @returns employee created from the form
   */
  createEmployeeFromForm(id:string): EmployeeDTO {
    const name = this.formGroup.get('name')?.value || '';
    const lastName = this.formGroup.get('lastName')?.value || '';
    const email = this.formGroup.get('email')?.value || '';
    const salary = Number(this.formGroup.get('salary')?.value) || 0;
    const date = this.formGroup.get('date')?.value || new Date();
    const active = this.formGroup.get('active')?.value || false;

    const employee = new EmployeeDTO(
      id,
      name,
      lastName,
      email,
      salary,
      active,
      date
    );
    return employee;
  }
}
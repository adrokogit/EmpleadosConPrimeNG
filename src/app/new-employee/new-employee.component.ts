import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeesService } from '../employees.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../model/Employee';
import { dateBeforeTodayValidator } from './date-validators'; // Importa el validador personalizado


@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrl: './new-employee.component.scss'
})
export class NewEmployeeComponent {

  stateOptions: any[] = [{ label: 'Activo', value: true }, { label: 'Inactivo', value: false }];

  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    salary: new FormControl('', [Validators.required, Validators.min(0)]),
    date: new FormControl(null,[ Validators.required, dateBeforeTodayValidator]),
    active: new FormControl(false, Validators.required),
  });
  id:string = "";

  constructor(private employeesService: EmployeesService, private router: Router, private route: ActivatedRoute) { 
    if (this.route.snapshot.params['id']) { 
      this.id = this.route.snapshot.params['id'];
    }    
  }

  createEmployee() {
    if(this.formGroup.valid){
      const name = this.formGroup.get('name')?.value || '';
      const lastName = this.formGroup.get('lastName')?.value || '';
      const email = this.formGroup.get('email')?.value || '';
      const salary = Number(this.formGroup.get('salary')?.value) || 0;
      const date = this.formGroup.get('date')?.value || new Date();
      const active = this.formGroup.get('active')?.value || false;

      const employee = new Employee(
        '',
        name,
        lastName,
        email,
        salary,
        active,
        date
      );

      this.employeesService.createEmployee(employee);
      this.router.navigate([employee.active ? '/':'/inactive']);
    }else{
      console.error('El formulario es inválido. Por favor, corrija los errores.');
    }
  
  }

 

  modifyEmployee(){
    
  }
}
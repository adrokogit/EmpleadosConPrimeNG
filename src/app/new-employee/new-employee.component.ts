import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrl: './new-employee.component.scss'
})
export class NewEmployeeComponent {

  date:Date = new Date();
  active: boolean = true;
  stateOptions: any[] = [{ label: 'Activo', value: 'true' },{ label: 'Inactivo', value: 'false' }];

  formGroup = new FormGroup({
    name: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    salary: new FormControl(''),
    date: new FormControl(''),
    active: new FormControl(''),    
  });
}

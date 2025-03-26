import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'PrimeNgEmpleadosNew';
  items = [
    {
        label: 'Empleados Activos',
        icon: 'pi pi-user',
        command : () => this.navigateTo('')
    },
    {
        label: 'Nuevo Empleado',
        icon: 'pi pi-user-plus',
        command : () => this.navigateTo('/newemployee')
    },
    {
      label: 'Empleados Inactivos',
      icon: 'pi pi-flag',
      command : () => this.navigateTo('/inactive')
  },
  
  ];
  constructor(private router: Router) { }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

}

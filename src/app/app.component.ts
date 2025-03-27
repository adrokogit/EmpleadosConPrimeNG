import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'PrimeNgEmpleadosNew';
  items = [
    {
        label: 'Activos',
        icon: 'pi pi-user',
        command : () => this.navigateTo('')
    },
    {
        label: 'Nuevo',
        icon: 'pi pi-plus',
        command : () => this.navigateTo('/newemployee')
    },
    {
      label: 'Inactivos',
      icon: 'pi pi-flag',
      command : () => this.navigateTo('/inactive')
  },
  
  ];
  constructor(private router: Router, private messageService: MessageService) {
   }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  showToast(summary: string, detail: string) {
    this.messageService.add({severity: 'success', summary: summary, detail: detail});
  }

}

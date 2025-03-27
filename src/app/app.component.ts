/**
 * @file app.component.ts
 * @author Adrián Fernández Álvarez
 * @description This file contains the main component of the application
 * @version 1.0.0
 * @since 27/03/2025
 */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  /**
   * Title of the application
   */
  title = 'PrimeNgEmpleadosNew';
  /**
   * Items of the menu
   */
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

  /**
   * 
   * @param router autoinjected
   * @param messageService autoinjected
   */
  constructor(private router: Router, private messageService: MessageService) {
   }

   /**
    * Navigates to the route, it is used by the menu
    * @param route 
    */
  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  /**
   * Shows a toast with the summary and detail
   * @param summary 
   * @param detail 
   */
  showToast(summary: string, detail: string) {
    this.messageService.add({severity: 'success', summary: summary, detail: detail});
  }

}

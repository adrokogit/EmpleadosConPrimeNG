import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';

import { Table, TableModule } from 'primeng/table';
import { EmployeesTableComponent } from './employees-table/employees-table.component';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { NewEmployeeComponent } from './new-employee/new-employee.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectButtonModule } from 'primeng/selectbutton';
import { EmployeesService } from './employees.service';
import { InactiveEmployeesTableComponent } from './inactive-employees-table/inactive-employees-table.component';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
const routes: Routes = [
  { path: '', component: EmployeesTableComponent },
  { path: 'inactive', component: InactiveEmployeesTableComponent },
  { path: 'newemployee', component: NewEmployeeComponent },
  { path: 'modifyemployee/:id', component: NewEmployeeComponent },
  { path: '**', component: EmployeesTableComponent },

];



@NgModule({
  declarations: [
    AppComponent,
    EmployeesTableComponent,
    NewEmployeeComponent,
    InactiveEmployeesTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    MenubarModule,
    ButtonModule,
    ToolbarModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ToggleButtonModule,
    BrowserAnimationsModule,
    SelectButtonModule,
    CardModule,
    ToastModule,
    RouterModule.forRoot(routes, { useHash: false }),
  ],
  providers: [EmployeesService,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

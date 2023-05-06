import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DailyComponent } from './daily/daily.component';
import { RouterModule } from '@angular/router';
import { salaryRoutes } from './salary.routing';
import { SharedModule } from 'app/shared/shared.module';

import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';



@NgModule({
  declarations: [
    DailyComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TableModule,
    CalendarModule,
    RouterModule.forChild(salaryRoutes)
  ]
})
export class SalaryModule { }

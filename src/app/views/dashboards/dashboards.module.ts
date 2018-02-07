import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard.component';
import { RatingDashboardComponent } from './ratingDashboard.component';

import { Dashboard1Component } from './dashboard1.component';
import { Dashboard2Component } from './dashboard2.component';
import { Dashboard3Component } from './dashboard3.component';
import { Dashboard4Component } from './dashboard4.component';
import { Dashboard41Component } from './dashboard41.component';
import { Dashboard5Component } from './dashboard5.component';

// Chart.js Angular 2 Directive by Valor Software (npm)
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { FlotModule } from '../../components/charts/flotChart';
import { IboxtoolsModule } from '../../components/common/iboxtools/iboxtools.module';
import { PeityModule } from '../../components/charts/peity';
import { SparklineModule } from '../../components/charts/sparkline';
import { JVectorMapModule } from '../../components/map/jvectorMap';


@NgModule({
  declarations: [
    DashboardComponent,
    RatingDashboardComponent,
    Dashboard1Component,
    Dashboard2Component,
    Dashboard3Component,
    Dashboard4Component,
    Dashboard41Component,
    Dashboard5Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ChartsModule,
    FlotModule,
    IboxtoolsModule,
    PeityModule,
    SparklineModule,
    JVectorMapModule
  ],
  exports: [
    DashboardComponent,
    RatingDashboardComponent,
    Dashboard1Component,
    Dashboard2Component,
    Dashboard3Component,
    Dashboard4Component,
    Dashboard41Component,
    Dashboard5Component
  ],
})

export class DashboardsModule {}

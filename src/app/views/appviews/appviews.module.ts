import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";

import {StarterViewComponent} from "./starterview.component";
import {InboxComponent} from "./inbox.component";
import {HotComponent} from "./hot.component";
import {LoginComponent} from "./login.component";

import {PeityModule } from '../../components/charts/peity';
import {SparklineModule } from '../../components/charts/sparkline';

@NgModule({
  declarations: [
    StarterViewComponent,
    InboxComponent,
    HotComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    PeityModule,
    SparklineModule
  ],
  exports: [
    StarterViewComponent,
    InboxComponent,
    HotComponent,
    LoginComponent
  ],
})

export class AppviewsModule {
}

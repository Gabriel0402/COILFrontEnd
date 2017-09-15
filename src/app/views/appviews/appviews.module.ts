import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import { FormsModule } from '@angular/forms';
import {StarterViewComponent} from "./starterview.component";
import {InboxComponent} from "./inbox.component";
import {HotComponent} from "./hot.component";
import {LoginComponent} from "./login.component";
import {ForumComponent} from "./forum.component";

import {PeityModule } from '../../components/charts/peity';
import {SparklineModule } from '../../components/charts/sparkline';
import {SearchPipe} from "./search.pipe";
import { AlertModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    StarterViewComponent,
    InboxComponent,
    HotComponent,
    LoginComponent,
    ForumComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    PeityModule,
    SparklineModule,
    AlertModule.forRoot()
  ],
  exports: [
    StarterViewComponent,
    InboxComponent,
    HotComponent,
    LoginComponent,
    ForumComponent
  ],
})

export class AppviewsModule {
}

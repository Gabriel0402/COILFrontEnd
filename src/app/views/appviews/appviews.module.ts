import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { StarterViewComponent } from "./starterview.component";
import { InboxComponent } from "./inbox.component";
import { HotComponent } from "./hot.component";
import { LoginComponent } from "./login.component";
import { ForumComponent } from "./forum.component";
import { ForumMessageComponent } from "./forumMessage.component";
import { RatingCustomComponent } from "./ratingCustom.component";
import { HuskyComponent } from "./huskyViews/husky.component";
import { HuskyHappiestComponent } from "./huskyViews/huskyHappiest.component";
import { HuskyNeutralComponent } from "./huskyViews/huskyNeutral.component";
import { HuskySadComponent } from "./huskyViews/huskySad.component";
import { HuskyDeadComponent } from "./huskyViews/huskyDead.component";

import { PeityModule } from '../../components/charts/peity';
import { SparklineModule } from '../../components/charts/sparkline';
import { SearchPipe } from "./search.pipe";
import { OrderBy } from "./order.pipe";
import { AlertModule } from 'ngx-bootstrap';
import { RatingModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    StarterViewComponent,
    InboxComponent,
    HotComponent,
    LoginComponent,
    ForumComponent,
    ForumMessageComponent,
    RatingCustomComponent,
    HuskyComponent,
    HuskyHappiestComponent,
    HuskyNeutralComponent,
    HuskySadComponent,
    HuskyDeadComponent,
    SearchPipe,
    OrderBy
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    PeityModule,
    SparklineModule,
    AlertModule.forRoot(),
    RatingModule.forRoot()
  ],
  exports: [
    StarterViewComponent,
    InboxComponent,
    HotComponent,
    LoginComponent,
    ForumComponent,
    ForumMessageComponent,
    RatingCustomComponent,
    HuskyComponent,
    HuskyHappiestComponent,
    HuskyNeutralComponent,
    HuskySadComponent,
    HuskyDeadComponent
  ],
})

export class AppviewsModule {
}

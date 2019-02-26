import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';

// App views
import { DashboardsModule } from './views/dashboards/dashboards.module';
import { AppviewsModule } from './views/appviews/appviews.module';

// App modules/components
import { LayoutsModule } from './components/common/layouts/layouts.module';

import { AuthGuard } from './services/guards.service';
import { AuthenticationService } from './services/authentication.service';
import { AlertService } from './services/alert.service';
import { RestService } from './services/rest.service';
import { InfoService } from './services/info.service';
import { AlertComponent } from './components/alert/alert.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalModule } from 'ngx-bootstrap/modal';
import { EmotionDetectorService } from "./services/emotionDetector.service";
import { UserService } from "./services/user.service";

//app pipe
@NgModule({
  declarations: [
    AppComponent,
    AlertComponent
  ],
  imports: [
    ModalModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    DashboardsModule,
    LayoutsModule,
    AppviewsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    AuthGuard,
    AuthenticationService,
    AlertService,
    RestService,
    InfoService,
    BsModalService,
    EmotionDetectorService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

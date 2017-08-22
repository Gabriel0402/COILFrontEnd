import {Routes} from "@angular/router";

import {DashboardComponent} from "./views/dashboards/dashboard.component";
import {Dashboard1Component} from "./views/dashboards/dashboard1.component";
import {Dashboard2Component} from "./views/dashboards/dashboard2.component";
import {Dashboard3Component} from "./views/dashboards/dashboard3.component";
import {Dashboard4Component} from "./views/dashboards/dashboard4.component";
import {Dashboard41Component} from "./views/dashboards/dashboard41.component";
import {Dashboard5Component} from "./views/dashboards/dashboard5.component";
import {ForumComponent} from "./views/appviews/forum.component"

import {StarterViewComponent} from "./views/appviews/starterview.component";
import {InboxComponent} from "./views/appviews/inbox.component";
import {HotComponent} from "./views/appviews/hot.component";
import {LoginComponent} from "./views/appviews/login.component";

import {BlankLayoutComponent} from "./components/common/layouts/blankLayout.component";
import {BasicLayoutComponent} from "./components/common/layouts/basicLayout.component";
import {TopNavigationLayoutComponent} from "./components/common/layouts/topNavigationLayout.component";
import {AuthGuard} from "./services/guards.service";

export const ROUTES:Routes = [
  // Main redirect
  {path: '', redirectTo: 'starterview', pathMatch: 'full'},

  // App views
  {
    path: 'dashboards', component: BasicLayoutComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'dashboard1', component: Dashboard1Component},
      {path: 'dashboard2', component: Dashboard2Component},
      {path: 'dashboard3', component: Dashboard3Component},
      {path: 'dashboard4', component: Dashboard4Component},
      {path: 'dashboard5', component: Dashboard5Component}
    ]
  },
  {
    path: 'dashboards', component: TopNavigationLayoutComponent,
    children: [
      {path: 'dashboard41', component: Dashboard41Component}
    ]
  },
  {
    path: '', component: BasicLayoutComponent,
    children: [
      {path: 'starterview', component: StarterViewComponent,canActivate: [AuthGuard]}
    ]
  },
  {
    path: '', component: BasicLayoutComponent,
    children: [
      {path: 'inbox', component: InboxComponent}
    ]
  },
  {
    path: '', component: BasicLayoutComponent,
    children: [
      {path: 'hot', component: HotComponent}
    ]
  },
  {
    path: '', component: BlankLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
    ]
  },
  {
    path: '', component: BasicLayoutComponent,
    children: [
      {path: 'forum', component: ForumComponent}
    ]
  },
  

  // Handle all other routes
  {path: '**',  redirectTo: 'starterview'}
];

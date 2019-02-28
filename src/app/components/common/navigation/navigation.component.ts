import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import 'jquery-slimscroll';

declare var jQuery: any;

@Component({
  selector: 'navigation',
  templateUrl: 'navigation.template.html'
})
export class NavigationComponent {
  public alerts: any = [];

  constructor(private router: Router) {}

  ngAfterViewInit() {
    jQuery('#side-menu').metisMenu();

    if (jQuery('body').hasClass('fixed-sidebar')) {
      jQuery('.sidebar-collapse').slimscroll({
        height: '100%'
      });
    }
  }

  activeRoute(routename: string): boolean{
    return this.router.url.indexOf(routename) > -1;
  }

  onNavigate() {
    window.open('https://goo.gl/forms/d5dMg2d6oBV8gHbC3', '_blank');
  }

}

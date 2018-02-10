import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'login',
  templateUrl: 'login.template.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    username: any;
    password: any;
    public alerts: any = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    if(data.status=="error"){
                        this.alerts.push({
                            type: 'danger',
                            msg: `Wrong username or passowrd`,
                            timeout: 3000
                          });
                        this.loading = false;
                        this.model.username="";
                        this.model.password="";
                    }
                    else{
                        this.router.navigate([this.returnUrl]);
                    }
                });
    }
}


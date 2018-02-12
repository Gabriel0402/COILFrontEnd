import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./component.css']
})

export class AccountComponent implements OnInit, OnDestroy {
  @Input() password: string;
  public alerts: any = [];

  public ngOnInit(): any {}

  public ngOnDestroy(): any {
    this.password = '';
  }

  public constructor ( private restService: RestService, private alertService: AlertService ) {}

  updatePassword() {
    let pw = { password: this.password };

    this.restService.changePsw(pw).subscribe( data => {
      if (data.code === '200') {
        pw = { password: '' };

        this.password = '';

        this.alerts.push({
          type: 'success',
          msg: `Successfully updated your password`,
          timeout: 3000
        });
      }
    });
  }
}

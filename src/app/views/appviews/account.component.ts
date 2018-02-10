import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./component.css']
})

export class AccountComponent implements OnInit, OnDestroy {
  @Input() password: string;
  private alerts: [{ type: string; msg: string; timeout: number }];

  public ngOnInit(): any {}

  public ngOnDestroy(): any {
    this.password = '';
  }

  public constructor ( private restService: RestService, private alertService: AlertService ) {}

  updatePassword() {
    let pw = { password: this.password };

    this.restService.changePsw(pw).subscribe( data => {
      if (data.status === 'success') {
        pw = { password: '' };

        this.password = '';

        this.alerts = [{
          type: 'success',
          msg: `Successfully updated your password`,
          timeout: 3000
        }];
      }

    }).unsubscribe();

    this.password = '';
  }
}

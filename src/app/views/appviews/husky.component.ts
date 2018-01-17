import { Component, OnDestroy, OnInit } from '@angular/core';

import { RestService } from '../../services/rest.service';
import { NgStyle } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
  selector: 'husky',
  templateUrl: './husky.component.html',
  styleUrls: ['husky.component.css', 'component.css']

})

export class HuskyComponent implements OnDestroy, OnInit{
  ngOnInit() {}
  ngOnDestroy() {}

}

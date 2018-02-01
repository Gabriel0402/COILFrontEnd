import { Component, OnDestroy, OnInit } from "@angular/core";

@Component({
  selector: 'husky-dead',
  template: `
    <div class="row husky-dead justify-content-md-center"></div>
  `,
  styleUrls: ['./husky.component.css']
})

export class HuskyDeadComponent implements OnDestroy, OnInit {

  ngOnInit(): any {}
  ngOnDestroy(): any {}

}

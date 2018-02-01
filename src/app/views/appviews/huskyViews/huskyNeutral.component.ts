import { Component, OnDestroy, OnInit } from "@angular/core";

@Component({
  selector: 'husky-neutral',
  template: `
    <div class="row husky-neutral justify-content-md-center"></div>
  `,
  styleUrls: ['./husky.component.css']
})

export class HuskyNeutralComponent implements OnDestroy, OnInit {

  ngOnInit(): any {}
  ngOnDestroy(): any {}

}

import { Component, OnDestroy, OnInit } from "@angular/core";

@Component({
  selector: 'husky-happy',
  template: `
    <div class="row husky-happy justify-content-md-center"></div>
  `,
  styleUrls: ['./husky.component.css']
})

export class HuskyHappyComponent implements OnDestroy, OnInit {

  ngOnInit(): any {}
  ngOnDestroy(): any {}

}

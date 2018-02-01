import { Component, OnDestroy, OnInit } from "@angular/core";

@Component({
  selector: 'husky-sad',
  template: `
    <div class="row husky-sad justify-content-md-center"></div>
  `,
  styleUrls: ['./husky.component.css']
})

export class HuskySadComponent implements OnDestroy, OnInit {

  ngOnInit(): any {}
  ngOnDestroy(): any {}

}

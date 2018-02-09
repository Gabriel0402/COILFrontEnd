import { Component, OnDestroy, OnInit } from "@angular/core";

@Component({
  selector: 'husky-dead',
  template: `
    <img src="../../../assets/images/emotions_profile/dead.png" alt="Profile Image">
  `,
  styleUrls: ['../component.css']
})

export class HuskyDeadComponent implements OnDestroy, OnInit {

  ngOnInit(): any {}
  ngOnDestroy(): any {}

}

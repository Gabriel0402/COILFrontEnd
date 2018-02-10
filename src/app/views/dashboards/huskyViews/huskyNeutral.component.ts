import { Component, OnDestroy, OnInit } from "@angular/core";

@Component({
  selector: 'husky-neutral',
  template: `
    <img src="../../../assets/images/emotions_profile/neutral.png" alt="Profile Image">
  `,
  styleUrls: ['../component.css']
})

export class HuskyNeutralComponent implements OnDestroy, OnInit {

  ngOnInit(): any {}
  ngOnDestroy(): any {}

}

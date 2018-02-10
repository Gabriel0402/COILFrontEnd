import { Component, OnDestroy, OnInit } from "@angular/core";

@Component({
  selector: 'husky-happiest',
  template: `
    <img src="../../../assets/images/emotions_profile/happiest.png" alt="Profile Image">
  `,
  styleUrls: ['../component.css']
})

export class HuskyHappiestComponent implements OnDestroy, OnInit {

  ngOnInit(): any {}
  ngOnDestroy(): any {}

}

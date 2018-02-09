import { Component, OnDestroy, OnInit } from "@angular/core";

@Component({
  selector: 'husky-sad',
  template: `
    <img src="../../../assets/images/emotions_profile/sad.png" alt="Profile Image">
  `,
  styleUrls: ['../component.css']
})

export class HuskySadComponent implements OnDestroy, OnInit {

  ngOnInit(): any {}
  ngOnDestroy(): any {}

}

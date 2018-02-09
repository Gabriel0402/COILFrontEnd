import { Component, OnDestroy, OnInit } from "@angular/core";

@Component({
  selector: 'husky-happy',
  template: `
    <img src="../../../assets/images/emotions_profile/happy.png" alt="Profile Image">
  `,
  styleUrls: ['../component.css']
})

export class HuskyHappyComponent implements OnDestroy, OnInit {

  ngOnInit(): any {}
  ngOnDestroy(): any {}

}

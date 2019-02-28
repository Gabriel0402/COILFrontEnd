import { Component } from '@angular/core';
import { sharedStylesheetJitUrl } from '@angular/compiler';


@Component({
  selector: 'footer',
  templateUrl: 'footer.template.html',
 

})
export class FooterComponent { 

  onfooter() {
    window.open('https://docs.google.com/document/d/1Yoxofp0p7KRkcA9tjtGO_qOH5I7XaTTTe5x3bpWdcHs/edit?usp=sharing', '_blank');
  }
}



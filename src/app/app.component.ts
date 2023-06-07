import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'connecTFG-frontend';

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('es');

    var userLanguage = navigator.language
    
    if (userLanguage == 'ca') {
      translate.use('va')
    } else {
      translate.use('es');
    }
  }
}

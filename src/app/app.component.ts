import {Component, OnInit} from '@angular/core';
import {LoadingBarService} from '@ngx-loading-bar/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  constructor(public loadingBarService: LoadingBarService, 
              private translateService: TranslateService,
              ) {

  }
  
  public ngOnInit(): void {
    this.translateService.addLangs(['en', 'es', 'pt']);
    this.translateService.setDefaultLang('en');
    this.translateService.use(this.translateService.getBrowserLang());
  }
}

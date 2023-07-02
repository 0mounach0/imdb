import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export enum LanguageId {
  fr = 'fr',
  en = 'en',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang(LanguageId.en);
  }

  public switchLang(language: keyof typeof LanguageId): void {
    this.translateService.use(language);
  }
}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LanguageId } from 'src/app/app.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'imdb-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() language: EventEmitter<keyof typeof LanguageId>;
  @Output() $searchQuery: EventEmitter<string>;
  public selectedLang: keyof typeof LanguageId;
  public langs = Object.entries(LanguageId).map(([key, value]) => ({ key, value }));;
  public searchQuery = '';

  constructor(private translateService: TranslateService) {
    this.language = new EventEmitter();
    this.$searchQuery = new EventEmitter();
    this.selectedLang = this.translateService.getDefaultLang() as keyof typeof LanguageId;
   }

  ngOnInit(): void {
  }

  switchLang(lang: keyof typeof LanguageId) {
    this.language.emit(lang);
    this.selectedLang = lang;
  }

}

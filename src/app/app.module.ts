import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/organisms/navbar/navbar.component';
import { MovieCardComponent } from './components/organisms/movie-card/movie-card.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { httpTranslateLoader } from './config/translate-loader.config';
import { PaginationComponent } from './components/organisms/pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { EditMovieModalComponent } from './components/molecules/movie-info/edit-movie-modal/edit-movie-modal.component';
import { ScrollToTopComponent } from './components/organisms/scroll-to-top/scroll-to-top.component';
import { MovieInfoComponent } from './components/molecules/movie-info/movie-info.component';
import { DebouceKeyupDirective } from './directives/debouce-keyup.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MovieCardComponent,
    PaginationComponent,
    EditMovieModalComponent,
    ScrollToTopComponent,
    MovieInfoComponent,
    DebouceKeyupDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: httpTranslateLoader,
          deps: [HttpClient],
      },
  }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

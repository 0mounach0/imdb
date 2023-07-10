import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from './services/data.service';
import { of } from 'rxjs';
import { Movie } from './models/movie.model';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let translateService: TranslateService;
  let dataService: DataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        {
          provide: TranslateService,
          useValue: {
            setDefaultLang: jasmine.createSpy(),
            use: jasmine.createSpy()
          }
        },
        {
          provide: DataService,
          useValue: {
            parseTSV: jasmine.createSpy().and.returnValue(of([]))
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    dataService = TestBed.inject(DataService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set default language on ngOnInit', () => {
    component.ngOnInit();
    expect(translateService.setDefaultLang).toHaveBeenCalledWith('en');
  });

  it('should parse TSV data and set properties on ngOnInit', () => {
    const jsonData: Movie[] = [
      {
        tconst: 'tt0000001',
        titleType: 'short',
        primaryTitle: 'Carmencita',
        originalTitle: 'Carmencita',
        isAdult: 0,
        startYear: '1894',
        endYear: '\\N',
        runtimeMinutes: 1,
        genres: 'Documentary,Short'
      }
    ];
    spyOn(dataService, 'parseTSV').and.returnValue(of(jsonData));
    component.ngOnInit();
    expect(dataService.parseTSV).toHaveBeenCalled();
    expect(component.jsonData).toEqual(jsonData);
    expect(component.totalPages).toEqual(1);
    expect(component.filteredData).toEqual(jsonData);
    expect(component.pageData).toEqual(jsonData);
    expect(component.distinctGenres).toEqual(['Documentary', 'Short']);
  });
});

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Papa } from 'ngx-papaparse';
import { of } from 'rxjs';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Papa, DataService]
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should parse TSV file successfully', (done) => {
    const sampleData = [
      { tconst: '123', titleType: 'Movie', primaryTitle: 'Movie 1', genres: 'Action' },
      { tconst: '456', titleType: 'Movie', primaryTitle: 'Movie 2', genres: 'Drama' }
    ];

    service.parseTSV().subscribe((jsonData) => {
      expect(jsonData).toEqual(sampleData);
      done();
    });

    const req = httpMock.expectOne('/assets/data/data.tsv');
    req.flush('tconst\ttitleType\tprimaryTitle\tgenres\n123\tMovie\tMovie 1\tAction\n456\tMovie\tMovie 2\tDrama\n');
  });

  it('should return page data', (done) => {
    const pageNumber = 2;
    const pageSize = 10;
    const sampleData = [
      { tconst: '789', titleType: 'Movie', primaryTitle: 'Movie 3', genres: 'Comedy' },
      { tconst: '012', titleType: 'Movie', primaryTitle: 'Movie 4', genres: 'Thriller' }
    ];

    service.data = [
      { tconst: '123', titleType: 'Movie', primaryTitle: 'Movie 1', genres: 'Action' },
      { tconst: '456', titleType: 'Movie', primaryTitle: 'Movie 2', genres: 'Drama' },
      ...sampleData
    ];

    service.getPageData(pageNumber, pageSize).subscribe((pageData) => {
      expect(pageData).toEqual(sampleData);
      done();
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

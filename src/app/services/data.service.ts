import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Papa } from 'ngx-papaparse';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data!: any[];

  constructor(private papa: Papa, private httpClient: HttpClient) {
  }

  /* parseTSV(filePath: string): void {
    this.httpClient.get(filePath, { responseType: 'text' }).subscribe(fileContent => {
      this.papa.parse(fileContent, {
        header: true,
        delimiter: '\t',
        preview: 5000,
        complete: (result) => {
          const jsonData = result.data;
          this.data = jsonData;
        },
        error: (error) => {
          console.error('Error parsing TSV file:', error);
        }
      });
    });
  } */

  parseTSV(): Observable<any> {
    let filePath: string = '/assets/data/data.tsv';
    return new Observable(observer => {
      this.httpClient.get(filePath, { responseType: 'text' }).subscribe(fileContent => {
        this.papa.parse(fileContent, {
          header: true,
          delimiter: '\t',
          complete: (result) => {
            const jsonData = result.data;
            observer.next(jsonData);
            observer.complete();
          },
          error: (error) => {
            observer.error(error);
          }
        });
      }, error => {
        observer.error(error);
      });
    });
  }

  getPageData(pageNumber: number, pageSize: number): Observable<any[]> {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const pageData = this.data?.slice(startIndex, endIndex);
    return of(pageData);
  }
}

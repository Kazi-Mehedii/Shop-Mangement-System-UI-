import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reports } from '../Model/reports';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  reportURl = 'https://localhost:7265/api/Report';

  constructor(private http: HttpClient) { }

  generateReport(type: string): Observable<Reports[]>{
    return this.http.get<Reports[]>(`${this.reportURl}/${type}`);
  }
  

}

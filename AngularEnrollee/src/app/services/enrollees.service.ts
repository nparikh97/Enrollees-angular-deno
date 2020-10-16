import { Injectable } from '@angular/core';
import { Enrollee } from '../models/enrollee';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EnrolleesService {

  apiURL = 'http://localhost:8080/';

  constructor(private _http: HttpClient) {}

  // getting all enrollees
  public getEnrollees(): Observable<Enrollee[]> {
    return this._http.get<Enrollee[]>(this.apiURL + 'enrollees');
  }

  // getting a particular enrollee
  public getEnrollee(id: string): Observable<Enrollee>{
    return this._http.get<Enrollee>(this.apiURL + 'enrollees/' + id);
  }

  // updating an enrollee
  public updateEnrollee(id: string, enrollee: Enrollee): Observable<any> {
    return this._http.put<any>(this.apiURL + 'enrollees/' + id , enrollee);
  }

}

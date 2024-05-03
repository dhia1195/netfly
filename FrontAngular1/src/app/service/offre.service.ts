import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OffreService {
  [x: string]: any;

  constructor(private _http: HttpClient) {}

  url: string = "http://localhost:3000/offre";


  public getAllOffre() {
    return this._http.get(this.url);
  }
  public getOffreById(_id: string) {
    return this._http.get(`${this.url}/${_id}`);
  }
  public addOffre(offre: any) {
    return this._http.post(this.url + "", offre);
  }
  public updateOffre(id: string, offre: any) {
    return this._http.patch(`${this.url}/${id}`, offre);
  }
  

  deleteOffre(id: string) {
    return this._http.delete(`${this.url}/${id}`).pipe(
        catchError((error: any) => {
            console.error('Error deleting offre:', error);
            return throwError('Something went wrong while deleting offre.');
        })
    );
}

}
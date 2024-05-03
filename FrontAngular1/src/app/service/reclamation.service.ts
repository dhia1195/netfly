import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, throwError } from "rxjs";


@Injectable({
  providedIn: "root",
})
export class ReclamationService {
  [x: string]: any;

  constructor(private _http: HttpClient) {}

  url: string = "http://localhost:3000/reclamation";


  public getAllReclamation() {
    return this._http.get(this.url);
  }
  public getReclamationById(_id: string) {
    return this._http.get(`${this.url}/${_id}`);
  }
  public addReclamation(reclamation: any) {
    return this._http.post(this.url + "", reclamation);
  }
  public updateReclamation(id: string, reclamation: any) {
    return this._http.patch(`${this.url}/${id}`, reclamation);
  }
  

  deleteReclamation(id: string) {
    return this._http.delete(`${this.url}/${id}`).pipe(
        catchError((error: any) => {
            console.error('Error deleting reclamation:', error);
            return throwError('Something went wrong while deleting reclamation.');
        })
    );
}

}
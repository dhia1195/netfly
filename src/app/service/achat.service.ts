import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AchatService {

  private apiUrl  = "https://backnest.onrender.com";  


  constructor(private http: HttpClient) {}

 public getAllAchats():Observable<any> {
    return this.http.get(`${this.apiUrl}/achats/getall`).pipe(
      catchError(this.handleError)
    );
  

  }
  searchAchats(query: string): Observable<any> {
    const url = `${this.apiUrl}/achats/search?query=${query}`;
    return this.http.get<any>(url);
  }
 
  public addAchat(achat: any) {
    {
      return this.http.post(`${this.apiUrl}/achats/ajouter`, achat).pipe(
        catchError(this.handleError)
      );
    }
  }
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error); // Use throwError instead of throw error
  }
  deleteAchat(id: string) {
    return this.http.delete(`${this.apiUrl}/achats/delete/${id}`).pipe(
        catchError((error: any) => {
            console.error('Error deleting reclamation:', error);
            return throwError('Something went wrong while deleting reclamation.');
        })
    );
}
public getAchatById(_id: string) {
  return this.http.get(`${this.apiUrl}/achats/getbyid/${_id}`);
}
public updateAchat(id: string, achat: any) {
  return this.http.patch(`${this.apiUrl}/achats/update/${id}`, achat);
}

  }


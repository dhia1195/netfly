import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ListeClientsService {
  
  
  

  private apiUrl = 'https://backnest.onrender.com'; 

  constructor(private http: HttpClient) {}

  getAllCients(): Observable<any> {
    return this.http.get(`${this.apiUrl}/clients/getall`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error); // Use throwError instead of throw error
  }


  ajouterClient(clientData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/clients/ajouter`, clientData)
      .pipe(
        catchError(this.handleError)
      );
  }
  deleteClient(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/clients/delete/${id}`).pipe(
      catchError(this.handleError)
    );
  }
  updateClient(clientId: string, updateData: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/clients/update/${clientId}`, updateData);
  }
  getClientById(id:string){
    return this.http.get(`${this.apiUrl}/clients/getbyid/${id}`);
  }
  searchClient(query: string): Observable<any> {
    const url = `${this.apiUrl}/clients/search?query=${query}`;
    return this.http.get<any>(url);
  }
  sendEmail(clientId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/clients/sendEmail/${clientId}`, {}).pipe(
      catchError(this.handleError)
    );

}
}
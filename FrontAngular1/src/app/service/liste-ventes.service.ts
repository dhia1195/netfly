import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListeVentesService {


  private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  getAllVentes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/ventes/getall`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error); // Use throwError instead of throw error
  }


  ajouterVente(venteData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/ventes/ajouter`, venteData).pipe(
      catchError(this.handleError)
    );
  }
  deleteVente(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/ventes/delete/${id}`).pipe(
      catchError(this.handleError)
    );
  }
  
  updateVente(venteId: string, updateData: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/Ventes/update/${venteId}`, updateData);
  }
  getVenteById(id:string){
    return this.http.get(`${this.apiUrl}/Ventes/getbyid/${id}`);
  }
}



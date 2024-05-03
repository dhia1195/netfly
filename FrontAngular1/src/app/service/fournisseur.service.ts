import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class fournisseurService {
 
 private apiUrl  = "http://localhost:3000";  

  constructor(private http: HttpClient) {}
  
  public getAllFournisseurs():Observable<any> {
    return this.http.get(`${this.apiUrl}/fournisseurs/getall`)
  
  }
  public addFournisseur(fournisseur: any) {
    return this.http.post(`${this.apiUrl}/fournisseurs/ajouter`,fournisseur);
  }
  public getFournisseurbyId(_id: string) {
    return this.http.get(`${this.apiUrl}/fournisseurs/getbyid/${_id}`);
  }
  public updateFournisseur(id: string, fournisseur: any) {
    return this.http.patch(`${this.apiUrl}/fournisseurs/update/${id}`, fournisseur);
  }
  deleteFournisseur(id: string) {
    return this.http.delete(`${this.apiUrl}/fournisseurs/${id}`).pipe(
        catchError((error: any) => {
            console.error('Error deleting reclamation:', error);
            return throwError('Something went wrong while deleting reclamation.');
        })
    );
}

  //  private handleError(error: any) {
  //   console.error('An error occurred:', error);
  //   return throwError(error); // Use throwError instead of throw error
  // }

  // getAllVentes(): Observable<any> {
  //   return this.http.get(${this.apiUrl}/ventes/getall)
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }

  // getAllFournisseurs(): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/fournisseurs/all`)
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }

  // private handleError(error: any) {
  //   console.error('An error occurred:', error);
  //   return throwError(error); // Use throwError instead of throw error
  // }


  // ajouterVente(venteData: any): Observable<any> {
  //   return this.http.post(${this.apiUrl}/ventes/ajouter, venteData)
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }

}
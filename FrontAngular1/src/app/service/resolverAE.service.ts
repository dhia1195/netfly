import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResolverAE implements Resolve<boolean> {
  constructor(private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // Your condition
    const shouldNavigate = localStorage.getItem("employe"); // Replace this with your actual condition
    const shouldNavigateA = localStorage.getItem("admin"); 
    if (shouldNavigate || shouldNavigateA) {
        
      return of(true);
    } else {
      
        this.router.navigate(['login']);
      
      // Navigate to a different route or handle the else case
      
      return of(false);
    }
  }
}
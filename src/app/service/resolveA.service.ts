import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResolverA implements Resolve<boolean> {
  constructor(private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // Your condition
    const shouldNavigate = localStorage.getItem("admin"); // Replace this with your actual condition
    const shouldNavigateE = localStorage.getItem("employe"); 
    if (shouldNavigate) {
        
      return of(true);
    } else {
      if(shouldNavigateE){
        this.router.navigate(['profileE']);
      }
      else{
        this.router.navigate(['login']);
      }
      // Navigate to a different route or handle the else case
      
      return of(false);
    }
  }
}
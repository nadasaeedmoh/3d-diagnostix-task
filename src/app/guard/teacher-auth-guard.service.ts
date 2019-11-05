import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class TeacherAuthGuardService implements CanActivate {

  canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    // throw new Error("Method not implemented.");
    console.log(localStorage.getItem('isteacher'))
    if(localStorage.getItem('isteacher')==='1')
      return true
    else
      return false
  }

  constructor() { }

  
    
}

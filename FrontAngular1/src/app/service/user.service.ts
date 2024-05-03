import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl="http://localhost:3000/user";
  
  constructor(private _http:HttpClient) {
    _http.request
   }
   inscription(body:any){
    return this._http.post(this.apiUrl,body)
   }
   inscriptionG(body:any){
    return this._http.post(this.apiUrl+"/google",body)
   }
   connexion(email:string,password:string){
    return this._http.get(this.apiUrl+"/connexion/"+email+"/"+password);
   }
   decode(token:string){
    return this._http.get(this.apiUrl+"/decode/"+token);
   }
   modify(body:any,id:number){
    return this._http.patch(this.apiUrl+"/"+id,body)
   }
   getUserById(id:number){
    return this._http.get(this.apiUrl+"/"+id);
   }
   getAllUser(){
    return this._http.get(this.apiUrl+"/");
   }
   changeState(id:string){
    return this._http.patch(this.apiUrl+"/changeState/"+id,{})
   }
   sendCode(email:string){
    return this._http.post(this.apiUrl+"/sendCode/"+email,{})
   }
   modifyEmail(body:any,email:number){
    return this._http.patch(this.apiUrl+"/modifyE/"+email,body)
   }
   signToken(body:any){
    return this._http.post(this.apiUrl+"/signToken",body)
   }
}

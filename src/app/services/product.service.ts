import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url="http://localhost:3001/";
  constructor(private http:HttpClient) { }

token:any = localStorage.getItem("token") ;


addNewProduct(data:any){
  
  console.log(this.token)
  const headers = new HttpHeaders({
    'Content-Type' : 'application/json',
    'Authorization' : this.token
  })
  return this.http.post(this.url+"product", data, {headers:headers})
}

getAllProducts(){
  
  
  const headers = new HttpHeaders({
    'Content-Type' : 'application/json',
    'Authorization' : this.token
  })
  return this.http.get(this.url+"product",{headers:headers})
}

updateProduct(data:any){
  const headers = new HttpHeaders({
    'Content-Type' : 'application/json',
    'Authorization' : this.token
  })
  return this.http.put(this.url+"product",data,{headers:headers})

}
deleteItem(id:any){
  
  return this.http.delete(this.url+"product/"+id)


}

getDownload(){
  
  
  const headers = new HttpHeaders({
    'Content-Type' : 'application/json',
    'Authorization' : this.token
  })
  return this.http.get(this.url+"download",{headers:headers,responseType:'blob'})
}

}

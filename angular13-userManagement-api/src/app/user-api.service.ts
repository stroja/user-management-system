import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  
  readonly userAPIUrl = "https://localhost:7039/user";

  constructor(private http:HttpClient) { }

  getUsers():Observable<User[]> {
    return this.http.get<any>(this.userAPIUrl + '/all');
  }

  getUser(id: number |string):Observable<User> {
    return this.http.get<any>(this.userAPIUrl + '/single?id=' + id);
  }

  addUser(user: User):Observable<any> {
    return this.http.post<User>(this.userAPIUrl + '/create', user);
  }

  updateUser(user: User):Observable<any> {
    return this.http.put<User>(this.userAPIUrl + '/update', user);
  }

  deleteUser(id: number |string):Observable<any> {
    return this.http.delete<any>(this.userAPIUrl + '/delete?id=' + id);
  }
}

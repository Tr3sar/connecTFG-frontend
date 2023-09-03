import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/core/model/User';

@Injectable({
  providedIn: 'root'
})
export class EditService {

  private url: string = environment.urlService + '/'

  constructor(private http: HttpClient) { }
  
  saveEdit(user: User): Observable<User> {
    let url = this.url;

    let name = user.name;
    let surname = user.surname;
    let social_url = user.social_url;
    let tfg_url = user.tfg_url;
    let degree = user.degree;
    let description = user.description
  

    return this.http.put<User>(url + '/edit', { name, surname, social_url, tfg_url, degree, description });
  }
}

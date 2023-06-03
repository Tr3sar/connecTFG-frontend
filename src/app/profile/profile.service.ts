import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private url: string = environment.urlService + '/profile'

  constructor(private http: HttpClient, private loginService: LoginService) { }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formularioLogin = new FormGroup({
    nombre: new FormControl('', Validators.required),
    contraseña: new FormControl('', Validators.required)
  });
  constructor() {userService: UserService }

  ngOnInit(): void {
      }

onLoginUserClicked() {
  const email = this.formularioLogin.controls.nombre.value;
  const password = this.formularioLogin.controls.contraseña.value;
 /* try {
    if (email != null && password != null)
      //this.SignIn(email, password)
  } catch (error) {
    alert("El mail o contraseña es incorrecta")
  }*/

}
}
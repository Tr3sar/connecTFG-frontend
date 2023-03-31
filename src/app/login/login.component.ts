import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
/*  onLoginUserClicked() {
    const Name = this.formularioLogin.controls.email.value;
    const Password = this.formularioLogin.controls.password.value;
    try {
      if (Name != null && Password != null)
        this.AuthService.SignIn(Name, Password)
    } catch (error) {
      alert("El mail o contraseña es incorrecta")
    }

}*/}

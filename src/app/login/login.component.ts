import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formularioLogin: any;
  

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

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { User } from '../core/model/User';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  formularioRegistro = new FormGroup({
    name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    degree: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  formularioLogin = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private loginService: LoginService, private router: Router) {

  }

  ngOnInit(): void {
    this.loginService.logout()
  }

  onSignInClicked() {
    const email = this.formularioLogin.controls.email.value;
    const password = this.formularioLogin.controls.password.value;

    try {
      if (email != null && password != null)
        this.loginService.SignIn(email, password).subscribe(res => {
        this.router.navigate(['/feed'])
        })
    } catch (error) {
      alert("El mail o contraseña es incorrecta")
    }
  }

  onSignUpClicked() {
    const email = this.formularioRegistro.controls.email.value;
    const password = this.formularioRegistro.controls.password.value;
    const name = this.formularioRegistro.controls.name.value;
    const surname = this.formularioRegistro.controls.surname.value;
    const degree = this.formularioRegistro.controls.degree.value;
    const description = this.formularioRegistro.controls.description.value;

    try {
      if (email != null && password != null && name != null 
        && surname != null && degree != null && description != null)
        this.loginService.SignUp(email, password,name,surname,degree,description).subscribe(res => {
        this.router.navigate(['/login'])
        })
    } catch (error) {
      alert("El mail ya está siendo utilizado")
    }
  }
  }

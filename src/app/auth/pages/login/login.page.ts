import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from '../../services/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private formBuilder = inject( FormBuilder )
  private router = inject( Router );
  private loginService = inject( LoginServiceService );

  mostrarPassword = false;

  loginForm: FormGroup;
  name: string = 'Login';
  constructor() { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

  }

  togglePassword() {
    this.mostrarPassword = !this.mostrarPassword;
  }

  async onSubmit() {
    console.log("Hola")
    // const response = await this.loginService.loginUsuario(this.loginForm.value);
    this.router.navigate(['/dashboard/tabsprincipal/home']);
    // if (this.loginForm.valid) {
      // Aquí puedes manejar el envío del formulario
      // console.log('Formulario válido. Enviando datos:', this.loginForm.value);
    // }
    // console.log( response );
  }

}

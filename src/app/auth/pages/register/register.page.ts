import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  private formBuilder = inject( FormBuilder )

  loginForm: FormGroup;

  constructor() { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      usuario: ['', [Validators.required, Validators.email]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      // Aquí puedes manejar el envío del formulario
      console.log('Formulario válido. Enviando datos:', this.loginForm.value);
    }
  }

}

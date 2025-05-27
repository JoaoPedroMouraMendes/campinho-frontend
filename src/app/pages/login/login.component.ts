import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { StorageService } from '../../core/services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  fb = inject(FormBuilder)
  form: FormGroup
  authService = inject(AuthService)
  errorMessage = ''
  storageService = inject(StorageService)
  submitAttempted = false
  router = inject(Router)

  constructor() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  submit(event: SubmitEvent) {
    event.preventDefault()

    if (this.form.invalid) {
      this.errorMessage = 'Preencha todos os dados!'
      return
    }

    this.submitAttempted = true

    this.authService.login(this.form.value).subscribe({
      next: response => {
        console.log(response)
        // Armazena o token de acesso e o cargo
        this.storageService.saveToken(response.token)
        this.storageService.saveRole(response.role)
        // Redireciona para página inicial caso seja usuário comum ou para página de admin se for um admin
        if (response.role === 'ADMIN')
          this.router.navigate(['/admin/agenda'])
        else
          this.router.navigate(['/'])

        this.submitAttempted = false
      },
      error: error => {
        if (error.error.status)
          this.errorMessage = 'Senha ou email inválido.'
        else
          this.errorMessage = 'Ocorreu ao se comunicar com o servidor, tente novamente mais tarde.'

        this.submitAttempted = false
      }
    })
  }
}

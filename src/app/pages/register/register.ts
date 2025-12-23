import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  name = '';
  email = '';
  password = '';

  submitted = false;
  loading = false;
  registerError = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    this.submitted = true;
    this.registerError = '';

    // 🔥 CLAVE: forzar errores si está vacío
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    this.loading = true;

    try {
      // Simulación de registro + login
      this.auth.login({
        email: this.email,
        name: this.name
      });

      this.router.navigateByUrl('/');
    } catch {
      this.registerError = 'Ocurrió un error al registrar la cuenta.';
    } finally {
      this.loading = false;
    }
  }
}

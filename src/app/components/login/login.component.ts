import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'; 
import { CommonModule } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule
  ]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.errorMessage = null; // Réinitialiser le message d'erreur

    // Activation de l'animation après un court délai
    setTimeout(() => {
      const title = document.getElementById('login-title');
      if (title) {
        title.classList.add('animate-title');
      }
    }, 100); // Délai pour permettre le chargement
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = null; // Réinitialisation du message d'erreur

      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
        data => {
          this.authService.setUser(data.user);
          this.router.navigate(['/vendor-dashboard']);
          this.isLoading = false;
        },
        error => {
          console.error('Login error', error);
          this.errorMessage = 'Invalid email or password. Please try again.'; // Message d'erreur
          this.isLoading = false;
        }
      );
    }
  }
}

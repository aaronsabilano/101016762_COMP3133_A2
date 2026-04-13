import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GraphqlService } from '../../app/services/graphql';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username = '';
  password = '';
  message = '';

  constructor(private graphqlService: GraphqlService) {}

  onLogin(): void {
    if (!this.username || !this.password) {
      this.message = 'Please enter username and password';
      return;
    }

    this.graphqlService.login(this.username, this.password).subscribe({
      next: (result: any) => {
        const response = result?.data?.login;

        if (response?.user) {
          this.message = response.message;
          localStorage.setItem('user', JSON.stringify(response.user));
        } else {
          this.message = 'Login failed ❌';
        }
      },
      error: (err: any) => {
        console.error('Login error:', err);
        this.message = 'Login error ❌';
      }
    });
  }
}
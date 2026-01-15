import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  phone: string = '';
  message: string = '';

  constructor(private router: Router) {}

  async handleRegister() {
    // Clear previous messages
    this.message = '';

    // Trim inputs to remove extra spaces
    const username = this.username.trim();
    const email = this.email.trim();
    const password = this.password;
    const confirmPassword = this.confirmPassword;
    const phone = this.phone.trim();

    // --- VALIDATIONS ---
    if (!username) {
      this.message = 'Enter username';
      return;
    }

    if (!email) {
      this.message = 'Enter email';
      return;
    }

    // Email must end with @gmail.com
    if (!/^[\w.-]+@gmail\.com$/.test(email)) {
      this.message = 'Email must be in @gmail.com format';
      return;
    }

    if (!password) {
      this.message = 'Enter password';
      return;
    }

    if (password.length < 8) {
      this.message = 'Password must be at least 8 characters';
      return;
    }

    if (password !== confirmPassword) {
      this.message = 'Password and Confirm Password do not match';
      return;
    }

    if (!phone) {
      this.message = 'Enter phone number';
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      this.message = 'Phone number must be exactly 10 digits';
      return;
    }

    // --- SEND DATA TO BACKEND ---
    try {
      const response = await fetch('http://localhost:8085/AddDataToDatabase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, phone })
      });

      const text = await response.text();
      this.message = text;

      // Optional: clear form if registration successful
      if (text == 'success') {
        this.username = '';
        this.email = '';
        this.password = '';
        this.confirmPassword = '';
        this.phone = '';
        this.message = 'User is added';
      }

    } catch (err) {
      this.message = 'Something went wrong';
    }
  }

  handleLogin() {
    this.router.navigate(['/login']);
  }
}

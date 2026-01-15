import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  msg: string = '';

  constructor(private router: Router) {}

  async handleLogin() {
    if (!this.username || !this.password) {
      this.msg = "Enter username & password";
      return;
    }

    try {
      const res = await fetch(`http://localhost:8085/LoginCheckByName?username=${this.username}&password=${this.password}`);
      const text = await res.text();

      if (text === "User exist") {
        this.router.navigate(['/dashboard']);
      } else {
        this.msg = "Invalid username or password";
      }
    } catch (err) {
      this.msg = "Something went wrong";
    }
  }
}

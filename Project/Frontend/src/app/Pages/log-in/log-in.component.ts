import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Login } from 'src/app/Interfaces/login';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent {
  model: Login = {
    email: '',
    password: '',
  };

  constructor(private auth: AuthService) {}

  handleSubmit(form: NgForm) {
    if (form.valid) {
      this.auth.login(form).subscribe((res) => {
        console.log(res);
      });
    }
  }
}

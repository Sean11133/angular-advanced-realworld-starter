import { LoginService } from './../login.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLoginInfo } from '../interfaces/login-info';
import { FormBuilder, NgForm, NgModel } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: UserLoginInfo = {
    email: '',
    password: '',
  };

  redirectUrl = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((s) => {
      this.redirectUrl = s.get('redirect') || '';
    });
  }
  doLogin(form: NgForm) {
    if (form.valid) {
      this.loginService.login(this.loginForm).subscribe({
        next: (result) => {
          localStorage.setItem('Token', result.user.token);
          if (this.redirectUrl !== '') {
            this.router.navigate([this.redirectUrl]);
          }
          this.router.navigate(['/']);
        },
        error: (error: HttpErrorResponse) => {
          alert(error.error.body);
        },
        complete: () => {},
      });
    }
  }

  isInValid(control: NgModel, form: NgForm) {
    return control.invalid && (control.touched || form.submitted);
  }
}

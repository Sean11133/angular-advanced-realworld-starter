import { LoginService } from './../login.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLoginInfo } from '../interfaces/login-info';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  NgModel,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // form = this.fb.nonNullable.group({
  //   email: this.fb.nonNullable.control('@gmail.com', {
  //     validators: [Validators.required, Validators.email],
  //     updateOn: 'blur',
  //   }),
  //   password: this.fb.control('', {
  //     validators: [
  //       Validators.required,
  //       Validators.minLength(6),
  //       Validators.maxLength(32),
  //     ],
  //   }),
  // });

  loginForm: UserLoginInfo = {
    email: '',
    password: '',
  };
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}
  doLogin(form: NgForm) {
    if (form.valid) {
      // this.loginForm.email = this.fc('email').value;
      // this.loginForm.password = this.fc('password').value;
      this.loginService.login(this.loginForm).subscribe((s) => {
        if (s.user) {
          localStorage.setItem('Token', s.user.token);
          this.router.navigate(['/']);
        } else {
          console.log('login error');
        }
      });
    }
    // let url = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    // this.router.navigateByUrl(url);
  }

  isInValid(control: NgModel, form: NgForm) {
    return control.invalid && (control.touched || form.submitted);
  }

  // fc(name: string) {
  //   return this.form.get(name) as FormControl;
  // }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../service/movie.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide: any;
  errors: any;
  loading: boolean = false;
  public response: any;
  constructor(
    private movieService: MovieService,
    private router: Router,
    public snackbarService: MatSnackBar
  ) {}

  ngOnInit(): void {
    /** Add form controls  */
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login() {
     /** It is used to login  details*/
    this.movieService.login(this.loginForm?.value).subscribe(
      (result) => {
        console.log(result);
        localStorage.setItem('token', result.data.token);
        this.router.navigateByUrl('movie');
      },
      (httpErr) => {
        this.showErrorMsg(httpErr);
      }
    );
  }

  showErrorMsg(httpErr: any) {
    /** It is used to show error page*/
    this.snackbarService.open(httpErr.error.error.message);
  }
}

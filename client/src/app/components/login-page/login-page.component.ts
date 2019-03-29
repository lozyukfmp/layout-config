import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {Subscription} from 'rxjs'
import {ActivatedRoute, Params, Router} from '@angular/router'
import {AuthService} from "../../services/auth/auth.service";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  aSub: Subscription;

  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(1)])
    });

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        this.snackBar.open("Now you can log in using your data.", "", {
          duration: 5000,
          panelClass: "_success"
        })
      } else if (params['accessDenied']) {
        this.snackBar.open("Please log in", "", {duration: 5000, panelClass: "_error"})
      } else if (params['sessionFailed']) {
        this.snackBar.open("Please login again.", "", {duration: 5000, panelClass: "_error"})
      }
    })
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

  onSubmit() {
    this.form.disable();

    this.aSub = this.auth.login(this.form.value).subscribe(
      () => this.router.navigate(['/fragments']),
      error => {
        this.snackBar.open(error.error.message, "", {duration: 5000, panelClass: "_error"})
        this.form.enable()
      }
    )
  }

}

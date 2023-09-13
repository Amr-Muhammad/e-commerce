import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { UserServiceService } from '../user-service.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private _UserServiceService: UserServiceService, private _Router: Router) {

  }

  registerationForm: FormGroup = new FormGroup({

    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{3,10}$/)]),
    rePassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{3,10}$/)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),

  })

  errorMessage: string = ''
  loadingFlag: boolean = false

  register(data: FormGroup) {

    this.loadingFlag = true

    this._UserServiceService.postUserData(data.value).subscribe(
      next => {
        this._Router.navigate(['/login'])
        console.log(next);
        this.loadingFlag = false
      },
      err => {
        this.errorMessage = err.error.message
        this.loadingFlag = false
      }
    )

  }


}

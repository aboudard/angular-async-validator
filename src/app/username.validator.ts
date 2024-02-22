import { Injectable, inject } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UsernameValidator {

  private userService = inject(UserService);

  createValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      return (
        this.userService
          .checkHttp(control.value)
          //.checkIfUsernameExists(control.value)
          .pipe(
            map((result: boolean) =>
              result ? { usernameAlreadyExists: true } : null
            )
          )
      );
    };
  }
}

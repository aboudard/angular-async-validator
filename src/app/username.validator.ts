import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';

export class UsernameValidator {
  static createValidator(userService: UserService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      return (
        userService
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

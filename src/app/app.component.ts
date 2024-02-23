import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import {
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { Store } from "./store";
import { User } from "./user";
import { UsernameValidator } from "./username.validator";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private store = inject(Store);
  //private usernameValidator = inject(UsernameValidator);

  registrationForm = new FormGroup({
    name: new FormControl("", {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    username: new FormControl("", {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
      asyncValidators: [inject(UsernameValidator).createValidator()],
    }),
  });

  userBatman: User = {
    name: "Bruce Wayne",
    username: "Batman",
  };

  validUser(): void {
    // typed form value as service parameter
    this.store.sendUser(this.registrationForm.getRawValue());
  }

  patch(): void {
    console.log("patch");

    // in case of dynamic add async validators
    /* this.registrationForm
      .get("username")
      .setAsyncValidators([this.usernameValidator.createValidator()]);
    this.registrationForm.get("username").updateValueAndValidity(); */

    // typesafe patchValue on the form
    this.registrationForm.patchValue(this.userBatman);
  }
}

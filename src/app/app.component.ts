import {
  ChangeDetectionStrategy,
  Component,
  inject
} from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { UsernameValidator } from "./username.validator";


@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private usernameValidator = inject(UsernameValidator);

  registrationForm = inject(FormBuilder).group({
    name: ['', [Validators.minLength(3), Validators.required]],
    username: ['', [Validators.minLength(3), Validators.required]],
  });

  patch(): void {
    console.log("patch");

    this.registrationForm
      .get("username")
      .setAsyncValidators([this.usernameValidator.createValidator()]);
    this.registrationForm.get("username").updateValueAndValidity();

    this.registrationForm.patchValue({
      name: "Bruce Wayne",
      username: "Batman",
    });
  }
}

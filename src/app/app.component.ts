import { ChangeDetectionStrategy, Component, VERSION } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { UserService } from './user.service';
import { UsernameValidator } from './username.validator';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(private fb: UntypedFormBuilder, private userService: UserService) {}

  registrationForm = this.fb.group({
    name: [null, [Validators.minLength(3), Validators.required]],
    username: [
      null,
      [Validators.minLength(3), Validators.required],
      // [],
    ],
  });

  patch(): void {
    console.log('patch');

    this.registrationForm
      .get('username')
      .setAsyncValidators([
        UsernameValidator.createValidator(this.userService),
      ]);
    this.registrationForm.get('username').updateValueAndValidity();

    this.registrationForm.patchValue({
      name: 'Bruce Wayne',
      username: 'Batman',
    });
  }
}

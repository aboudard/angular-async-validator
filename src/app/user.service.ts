import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private existingUsernames = ['Batman', 'Superman', 'Joker', 'Luthor'];
  http = inject(HttpClient);

  checkIfUsernameExists(value: string): Observable<boolean> {
    return of(this.existingUsernames.some((a) => a === value)).pipe(delay(500));
  }

  checkHttp(value: string): Observable<boolean> {
    return this.http.get<{value: string}>('https://intense-fire-5995.firebaseio.com/config.json').pipe(map((res) => value === res.value));
  }
}

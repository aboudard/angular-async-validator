import { Injectable } from "@angular/core";
import { User } from "./user";

@Injectable({
    providedIn: 'root',
  })
  export class Store {
    sendUser(user: User): void {
        console.log('Sending user', user);
      }
  }
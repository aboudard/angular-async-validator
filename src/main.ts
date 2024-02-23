import "./polyfills";

import {
  ENVIRONMENT_INITIALIZER,
  importProvidersFrom,
  inject
} from "@angular/core";

import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { bootstrapApplication } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { PrimeNGConfig } from "primeng/api";
import { RippleModule } from "primeng/ripple";
import { AppComponent } from "./app/app.component";

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RippleModule
    ),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: ENVIRONMENT_INITIALIZER,
      multi: true,
      useValue: () => {
        inject(PrimeNGConfig).ripple = true;
      },
    },
  ],
})
  .then((ref) => {
    // Ensure Angular destroys itself on hot reloads.
    if (window["ngRef"]) {
      window["ngRef"].destroy();
    }
    window["ngRef"] = ref;

    // Otherwise, log the boot error
  })
  .catch((err) => console.error(err));

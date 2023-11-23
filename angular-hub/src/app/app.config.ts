import { ApplicationConfig } from '@angular/core';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideFileRouter } from '@analogjs/router';
import { provideContent, withMarkdownRenderer } from '@analogjs/content';
import { provideAnimations } from '@angular/platform-browser/animations/async';
import { withViewTransitions } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: { timezone: '+0000' } },
    provideFileRouter(withViewTransitions()),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideContent(withMarkdownRenderer()),
    provideAnimationsAsync(),
  ],
};

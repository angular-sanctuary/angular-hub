import {ApplicationConfig} from '@angular/core';
import {provideHttpClient, withFetch} from '@angular/common/http';
import {provideClientHydration} from '@angular/platform-browser';
import {provideFileRouter} from '@analogjs/router';
import {provideContent, withMarkdownRenderer} from "@analogjs/content";
import {provideAnimations} from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
    providers: [
        provideFileRouter(),
        provideClientHydration(),
        provideHttpClient(withFetch()),
        provideContent(withMarkdownRenderer()),
        provideAnimations()
    ],
};

import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import App from './app/App.analog';
import { appConfig } from './app/app.config';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));

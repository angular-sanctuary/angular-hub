import { Injectable } from '@angular/core';
import { Theme } from '../models/theme.model';

const THEME_KEY = 'theme';

@Injectable({
  providedIn: 'root',
})
export class UserPreferencesService {
  getTheme(): Theme {
    const theme = localStorage.getItem(THEME_KEY) as Theme;
    return theme ? theme : 'system';
  }

  setTheme(theme: Theme): void {
    localStorage.setItem(THEME_KEY, theme);
  }
}

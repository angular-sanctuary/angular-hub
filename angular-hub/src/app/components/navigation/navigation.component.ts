import {
  afterRender,
  Component,
  computed,
  effect,
  inject,
  OnInit,
  Renderer2,
  signal,
  ViewChild,
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { filter, Observable, withLatestFrom } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import {
  IsActiveMatchOptions,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { FooterComponent } from '../footer.component';
import { Theme } from '../../models/theme.model';
import { UserPreferencesService } from '../../services/user-preferences.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    AsyncPipe,
    MatListModule,
    NgIf,
    RouterLink,
    RouterLinkActive,
    FooterComponent,
    RouterOutlet,
    NgClass,
  ],
})
export class NavigationComponent implements OnInit {
  #breakpointObserver = inject(BreakpointObserver);
  #router = inject(Router);
  #renderer = inject(Renderer2);
  #userPreferencesService = inject(UserPreferencesService);

  #theme = signal<Theme | undefined>(undefined);

  isLightTheme = computed(() => this.#theme() === 'light');
  isDarkTheme = computed(() => this.#theme() === 'dark');
  isSystemTheme = computed(() => this.#theme() === 'system');

  isHandset$: Observable<boolean> = this.#breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  @ViewChild('navigation') navigation!: MatDrawer;

  myMatchOptions: IsActiveMatchOptions = {
    queryParams: 'ignored',
    matrixParams: 'exact',
    paths: 'exact',
    fragment: 'exact',
  };

  constructor() {
    afterRender(() => {
      this.#theme.set(this.#userPreferencesService.getTheme());
    });

    effect(() => {
      this.#userPreferencesService.setTheme(this.#theme()!);
      switch (this.#theme()) {
        case 'light':
          this.#renderer.addClass(document.body, 'lightMode');
          this.#renderer.removeClass(document.body, 'darkMode');
          break;
        case 'dark':
          this.#renderer.addClass(document.body, 'darkMode');
          this.#renderer.removeClass(document.body, 'lightMode');
          break;
        case 'system':
          this.#renderer.removeClass(document.body, 'darkMode');
          this.#renderer.removeClass(document.body, 'lightMode');
          break;
      }
    });
  }

  ngOnInit(): void {
    this.#router.events
      .pipe(
        withLatestFrom(this.isHandset$),
        filter(([a, b]) => b && a instanceof NavigationEnd)
      )
      .subscribe(() => this.navigation.close());
  }

  setTheme(theme: Theme): void {
    this.#theme.set(theme);
  }
}

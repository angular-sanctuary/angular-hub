import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { filter, Observable, withLatestFrom } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { AsyncPipe, NgIf } from '@angular/common';
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
  ],
})
export class NavigationComponent implements OnInit {
  #breakpointObserver = inject(BreakpointObserver);
  #router = inject(Router);

  isHandset$: Observable<boolean> = this.#breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  @ViewChild('navigation') drawer!: MatDrawer;

  myMatchOptions: IsActiveMatchOptions = {
    queryParams: 'ignored',
    matrixParams: 'exact',
    paths: 'exact',
    fragment: 'exact',
  };

  ngOnInit(): void {
    this.#router.events
      .pipe(
        withLatestFrom(this.isHandset$),
        filter(([a, b]) => b && a instanceof NavigationEnd)
      )
      .subscribe(() => this.drawer.close());
  }
}

import { Injectable, signal } from '@angular/core';

/*
  This service is a workaround as Analog does not allow accessing to access
  the root route to retrieve the data object from another component
 */

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  title = signal('');

  setHeaderTitle(title: string) {
    this.title.set(title);
  }
}

import { Injectable } from '@angular/core';
import { ɵgetDOM } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class JsonLdService {
  dom = ɵgetDOM();

  updateJsonLd(jsonLd: unknown) {
    const scriptTag = this.dom
      .getDefaultDocument()
      .querySelector('script[type="application/ld+json"]');

    scriptTag!.innerHTML = JSON.stringify(jsonLd);
  }
}

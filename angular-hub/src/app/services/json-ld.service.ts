import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class JsonLdService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  updateJsonLd(jsonLd: unknown) {
    const scriptTag = this.document.querySelector(
      'script[type="application/ld+json"]',
    );
    scriptTag!.innerHTML = JSON.stringify(jsonLd);
  }
}

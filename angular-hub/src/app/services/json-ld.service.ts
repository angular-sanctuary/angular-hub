import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JsonLdService {
  updateJsonLd(jsonLd: unknown) {
    const scriptTag = document.querySelector(
      'script[type="application/ld+json"]',
    );

    scriptTag!.innerHTML = JSON.stringify(jsonLd);
  }
}

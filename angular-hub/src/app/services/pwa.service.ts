import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PwaService {
  private promptEvent: unknown;
  isInstallButtonVisible = signal(false);

  constructor() {}

  public initPwaPrompt() {
    window.addEventListener('beforeinstallprompt', (event: Event) => {
      event.preventDefault();
      this.promptEvent = event;
      this.isInstallButtonVisible.set(true);
    });
  }

  public async installPwa() {
    this.promptEvent.prompt();
    const { outcome } = await this.promptEvent.userChoice;
    this.isInstallButtonVisible.set(false);
  }
}

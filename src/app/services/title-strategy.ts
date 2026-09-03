import { Service } from '@angular/core';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Service()
export class PcHubTitleStrategy extends TitleStrategy {
  updateTitle(snapshot: RouterStateSnapshot): void {
    const title = this.buildTitle(snapshot);
    if (title !== undefined) {
      document.title = `PcHub | ${title}`;
    } else {
      document.title = 'PcHub';
    }
  }
}

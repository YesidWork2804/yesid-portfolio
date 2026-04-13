import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

const EMAIL = 'yesidwork2804@gmail.com';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  readonly year = new Date().getFullYear();

  readonly email = EMAIL;
  copied = false;

  private readonly clipboard =
    typeof navigator !== 'undefined' ? navigator.clipboard : undefined;

  async copyEmail(): Promise<void> {
    try {
      await this.clipboard?.writeText(this.email);
      this.copied = true;
      window.setTimeout(() => (this.copied = false), 1200);
    } catch {
      // ignore
    }
  }
}

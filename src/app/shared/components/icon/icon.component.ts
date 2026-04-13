import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  standalone: true,
  templateUrl: './icon.component.html'
})
export class IconComponent {
  /**
   * Architectural decision:
   * - Keep an ultra-thin icon wrapper in shared.
   * - It supports inline SVG usage without bringing an icon library yet.
   */
  @Input() title = '';
  @Input() size = 20;
}

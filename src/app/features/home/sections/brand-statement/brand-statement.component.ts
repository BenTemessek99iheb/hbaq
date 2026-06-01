import { Component } from '@angular/core';
import { InViewDirective } from '../../../../shared/directives/in-view.directive';

@Component({
  selector: 'app-brand-statement',
  standalone: true,
  imports: [InViewDirective],
  template: `
    <section class="statement">
      <div
        class="statement__inner"
        (inView)="onVisible()"
        [class.visible]="visible"
      >
        <!-- Decorative Punic ornament -->
        <div class="statement__ornament" aria-hidden="true">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="18" stroke="#C9993A" stroke-width="0.5" opacity="0.4"/>
            <path d="M20 4 L22 18 L36 20 L22 22 L20 36 L18 22 L4 20 L18 18 Z"
                  fill="#C9993A" opacity="0.35"/>
          </svg>
        </div>

        <p class="statement__text">
          We weave the spirit of Carthage into every thread —<br>
          <em>ancient craft, contemporary soul.</em>
        </p>

        <div class="statement__divider">
          <span></span>
          <span class="statement__divider-icon">◆</span>
          <span></span>
        </div>

        <p class="statement__meta">
          Crafted in Tunisia &nbsp;·&nbsp; Worn worldwide
        </p>
      </div>
    </section>
  `,
  styleUrls: ['./brand-statement.component.scss']
})
export class BrandStatementComponent {
  visible = false;
  onVisible(): void { this.visible = true; }
}
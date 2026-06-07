import { Component } from '@angular/core';
import { InViewDirective } from '../../../../shared/directives/in-view.directive';

@Component({
  selector: 'app-brand-statement',
  standalone: true,
  imports: [InViewDirective],
  template: `
    <section class="statement">

      <!-- Atmospheric Arabic ghost — القمرة at near-zero opacity -->
      <div class="statement__ambient" aria-hidden="true">
        <span class="statement__ambient-ar">قمرة</span>
      </div>

      <div class="statement__inner" (inView)="onVisible()" [class.visible]="visible">

        <!-- Sun / Moon duality mark -->
        <div class="statement__kite" aria-hidden="true">
          <svg width="72" height="52" viewBox="0 0 72 52" fill="none">
            <circle cx="22" cy="26" r="14"
                    stroke="rgba(168,124,46,0.28)" stroke-width="0.6" fill="none"/>
            <circle cx="50" cy="26" r="14"
                    stroke="rgba(143,168,172,0.32)" stroke-width="0.6" fill="none"/>
            <circle cx="22" cy="26" r="5"
                    fill="rgba(196,162,101,0.22)"/>
            <path d="M50 13 Q58 20 62 26 Q58 32 50 39 Q42 32 38 26 Q42 20 50 13Z"
                  fill="rgba(143,168,172,0.14)"
                  stroke="rgba(143,168,172,0.25)" stroke-width="0.5"/>
            <circle cx="36" cy="26" r="1.8" fill="rgba(168,124,46,0.35)"/>
            <circle cx="36" cy="26" r="4"
                    stroke="rgba(168,124,46,0.12)" stroke-width="0.5" fill="none"/>
          </svg>
        </div>

        <!-- Eyebrow label -->
        <div class="statement__eyebrow">
          <span class="statement__eyebrow-line"></span>
          <span class="statement__eyebrow-text">الشمس والقمرة</span>
          <span class="statement__eyebrow-line"></span>
        </div>

        <!-- Main title -->
        <h2 class="statement__title-ar" lang="ar" dir="rtl">
          بين النور والظل<br>تُولَد الحكاية
        </h2>
        <p class="statement__title-en">
          between light and shadow, a story is born
        </p>

        <!-- Poem body -->
        <div class="statement__poem" lang="ar" dir="rtl">
          <p class="statement__poem-line" style="--delay: 0.65s">
            حين تُغادر الشمسُ وتبقى <em>القمرة</em>
          </p>
          <p class="statement__poem-line statement__poem-line--secondary" style="--delay: 0.85s">
            ثمّة ضوءٌ لا يُرى — يُلبَس
          </p>
          <p class="statement__poem-line" style="--delay: 1.05s">
            من طين المتوسط <em>نُسِج</em>
          </p>
          <p class="statement__poem-line statement__poem-line--secondary" style="--delay: 1.2s">
            وفي حرير الزيتون — نُودَع
          </p>
        </div>

        <!-- Duality bridge ornament -->
        <div class="statement__bridge" aria-hidden="true">
          <span class="statement__bridge-arm statement__bridge-arm--sun"></span>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="9" cy="14" r="5.5"
                    stroke="rgba(168,124,46,0.45)" stroke-width="0.6"
                    fill="rgba(196,162,101,0.10)"/>
            <path d="M18 7 Q24 11 24 14 Q24 17 18 21 Q12 17 12 14 Q12 11 18 7Z"
                  stroke="rgba(143,168,172,0.4)" stroke-width="0.6"
                  fill="rgba(143,168,172,0.08)"/>
            <circle cx="14" cy="14" r="1.2" fill="rgba(168,124,46,0.3)"/>
          </svg>
          <span class="statement__bridge-arm statement__bridge-arm--moon"></span>
        </div>

        <!-- Signature -->
        <div class="statement__signature">
          <span class="statement__signature-ar" lang="ar" dir="rtl">صُنع بهدوء في تونس</span>
          <span class="statement__signature-en">quietly made in Tunisia</span>
        </div>

      </div>
    </section>
  `,
  styleUrls: ['./brand-statement.component.scss']
})
export class BrandStatementComponent {
  visible = false;
  onVisible(): void { this.visible = true; }
}
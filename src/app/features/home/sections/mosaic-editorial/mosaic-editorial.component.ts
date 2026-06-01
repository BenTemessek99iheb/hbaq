import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChildren,
  QueryList,
  PLATFORM_ID,
  inject,
  signal,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import { isPlatformBrowser, NgClass, NgStyle } from '@angular/common';
import { AssetService } from '../../../../core/services/asset.service';

interface MosaicPanel {
  id: string;
  role: 'primary' | 'secondary' | 'caption' | 'arabic' | 'spacer';
  imageUrl?: string;
  imageAlt?: string;
  label?: string;
  heading?: string;
  headingItalic?: string;
  body?: string;
  arabic?: string;
  arabicTransliteration?: string;
  arabicMeaning?: string;
  stat?: string;
  statLabel?: string;
  gridArea: string;
  visible: boolean;
}

@Component({
  selector: 'app-mosaic-editorial',
  standalone: true,
  imports: [NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="mosaic" aria-label="Editorial mosaic — HBAQ visual language">

      <!-- Section header -->
      <header class="mosaic__header" #revealTarget>
        <div class="mosaic__header-inner" [ngClass]="{ 'mosaic__header-inner--visible': headerVisible() }">
          <span class="mosaic__eyebrow">— Visual Language</span>
          <h2 class="mosaic__headline">
            <span class="mosaic__headline-line">Where threads</span>
            <span class="mosaic__headline-line mosaic__headline-line--italic">become archives</span>
          </h2>
        </div>
      </header>

      <!-- Architectural line system (decorative SVG) -->
      <div class="mosaic__grid-lines" aria-hidden="true">
        <svg class="mosaic__grid-svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice"
             xmlns="http://www.w3.org/2000/svg">
          <!-- Vertical rule -->
          <line x1="360" y1="0" x2="360" y2="900"
                stroke="#C9993A" stroke-width="0.4" opacity="0.18"
                stroke-dasharray="4 8"
                class="mosaic__svg-line mosaic__svg-line--1"/>
          <!-- Horizontal rule -->
          <line x1="0" y1="320" x2="1440" y2="320"
                stroke="#C9993A" stroke-width="0.4" opacity="0.12"
                stroke-dasharray="4 12"
                class="mosaic__svg-line mosaic__svg-line--2"/>
          <!-- Diagonal accent -->
          <line x1="800" y1="0" x2="1440" y2="600"
                stroke="#B5613A" stroke-width="0.3" opacity="0.10"
                class="mosaic__svg-line mosaic__svg-line--3"/>
          <!-- Corner bracket NW -->
          <path d="M 60 60 L 60 30 L 90 30" stroke="#C9993A" stroke-width="0.6"
                fill="none" opacity="0.3"/>
          <!-- Corner bracket SE -->
          <path d="M 1380 840 L 1380 870 L 1350 870" stroke="#C9993A" stroke-width="0.6"
                fill="none" opacity="0.3"/>
        </svg>
      </div>

      <!-- Main mosaic grid -->
      <div class="mosaic__grid">

        <!-- Panel A — Primary image, large -->
        <figure class="mosaic__panel mosaic__panel--primary"
                [ngClass]="{ 'mosaic__panel--visible': panelVisible()['a'] }"
                aria-label="Primary editorial image">
          <div class="mosaic__panel-img-wrap">
            <img
              [src]="asset.url('assets/images/editorial/mosaic-primary.png')"
              alt="HBAQ editorial — Mediterranean linen in motion"
              class="mosaic__panel-img"
              loading="lazy"
            />
            <div class="mosaic__panel-overlay"></div>
          </div>
          <!-- floating caption badge -->
          <figcaption class="mosaic__float-badge">
            <span class="mosaic__float-badge-label">SS 2025</span>
            <span class="mosaic__float-badge-divider"></span>
            <span class="mosaic__float-badge-text">Collection One</span>
          </figcaption>
        </figure>

        <!-- Panel B — Arabic identity block -->
        <div class="mosaic__panel mosaic__panel--arabic"
             [ngClass]="{ 'mosaic__panel--visible': panelVisible()['b'] }"
             aria-label="Arabic brand identity — الحبق">
          <div class="mosaic__arabic-composition">
            <!-- Geometric backdrop grid -->
            <div class="mosaic__arabic-grid" aria-hidden="true">
              <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"
                   class="mosaic__arabic-grid-svg">
                <!-- Construction circle -->
                <circle cx="200" cy="150" r="120" fill="none"
                        stroke="#C9993A" stroke-width="0.5" opacity="0.15"/>
                <circle cx="200" cy="150" r="80" fill="none"
                        stroke="#C9993A" stroke-width="0.3" opacity="0.10"/>
                <!-- Cross axes -->
                <line x1="80" y1="150" x2="320" y2="150"
                      stroke="#C9993A" stroke-width="0.4" opacity="0.12"/>
                <line x1="200" y1="30" x2="200" y2="270"
                      stroke="#C9993A" stroke-width="0.4" opacity="0.12"/>
                <!-- 45° diagonals -->
                <line x1="115" y1="65" x2="285" y2="235"
                      stroke="#C9993A" stroke-width="0.3" opacity="0.08"/>
                <line x1="285" y1="65" x2="115" y2="235"
                      stroke="#C9993A" stroke-width="0.3" opacity="0.08"/>
              </svg>
            </div>
            <div class="mosaic__arabic-text" lang="ar" dir="rtl">
              الحبق
            </div>
            <div class="mosaic__arabic-sub">
              <span class="mosaic__arabic-romanized">Al-Ḥabaq</span>
              <span class="mosaic__arabic-divider">—</span>
              <span class="mosaic__arabic-meaning">The Sacred Basil</span>
            </div>
          </div>
        </div>

        <!-- Panel C — Secondary image, portrait -->
        <figure class="mosaic__panel mosaic__panel--secondary"
                [ngClass]="{ 'mosaic__panel--visible': panelVisible()['c'] }"
                aria-label="Secondary editorial image — artisan detail">
          <div class="mosaic__panel-img-wrap">
            <img
              [src]="asset.url('assets/images/editorial/mosaic-detail.png')"
              alt="HBAQ — artisan textile close-up"
              class="mosaic__panel-img"
              loading="lazy"
            />
          </div>
        </figure>

        <!-- Panel D — Text editorial block -->
        <div class="mosaic__panel mosaic__panel--copy"
             [ngClass]="{ 'mosaic__panel--visible': panelVisible()['d'] }">
          <div class="mosaic__copy-inner">
            <span class="mosaic__copy-label">— Artistic Direction</span>
            <h3 class="mosaic__copy-heading">
              Afro-Asiatic dialogue,<br>
              <em>woven in linen</em>
            </h3>
            <p class="mosaic__copy-body">
              HBAQ exists at the intersection of civilisations.
              Each garment is an act of cultural translation —
              from Kufic geometry to Tunisian weave,
              from Sub-Saharan motif to Japanese silhouette.
            </p>
            <div class="mosaic__copy-rule"></div>
            <div class="mosaic__copy-stats">
              <div class="mosaic__stat">
                <span class="mosaic__stat-number">VI</span>
                <span class="mosaic__stat-label">Collection<br>Families</span>
              </div>
              <div class="mosaic__stat-divider"></div>
              <div class="mosaic__stat">
                <span class="mosaic__stat-number">∞</span>
                <span class="mosaic__stat-label">Cultural<br>References</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Panel E — Tertiary image, landscape -->
        <figure class="mosaic__panel mosaic__panel--tertiary"
                [ngClass]="{ 'mosaic__panel--visible': panelVisible()['e'] }"
                aria-label="Mediterranean coastal atmosphere">
          <div class="mosaic__panel-img-wrap">
            <img
              [src]="asset.url('assets/images/editorial/mosaic-coastal.png')"
              alt="Mediterranean coastal light — HBAQ atmosphere"
              class="mosaic__panel-img mosaic__panel-img--right"
              loading="lazy"
            />
            <div class="mosaic__panel-overlay mosaic__panel-overlay--light"></div>
          </div>
          <figcaption class="mosaic__inline-caption">
            Tunis · Carthage · Mediterranean Sea
          </figcaption>
        </figure>

      

      </div>
  <!-- Panel F — Pull quote / ornamental -->
        <blockquote class="mosaic__panel mosaic__panel--quote"
                    [ngClass]="{ 'mosaic__panel--visible': panelVisible()['f'] }">
          <div class="mosaic__ornament" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M14 2 L15.5 12.5 L26 14 L15.5 15.5 L14 26 L12.5 15.5 L2 14 L12.5 12.5 Z"
                    fill="#C9993A" opacity="0.5"/>
            </svg>
          </div>
          <p class="mosaic__quote-text">
            "To wear HBAQ is to carry the Mediterranean on your skin."
          </p>
          <cite class="mosaic__quote-cite">— Brand Vision, 2025</cite>
        </blockquote>
      <!-- Bottom mosaic strip (matching hero) -->
       
      <div class="mosaic__strip" aria-hidden="true" style="margin-bottom: 30px;"></div>
  <!-- Panel F — Pull quote / ornamental -->
        <blockquote class="mosaic__panel mosaic__panel--quote"
                    [ngClass]="{ 'mosaic__panel--visible': panelVisible()['f'] }">
          <div class="mosaic__ornament" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M14 2 L15.5 12.5 L26 14 L15.5 15.5 L14 26 L12.5 15.5 L2 14 L12.5 12.5 Z"
                    fill="#C9993A" opacity="0.5"/>
            </svg>
          </div>
          <p class="mosaic__quote-text">
            "To wear HBAQ is to carry the Mediterranean on your skin."
          </p>
          <cite class="mosaic__quote-cite">— Brand Vision, 2025</cite>
        </blockquote>
    </section>
  `,
  styleUrls: ['./mosaic-editorial.component.scss'],
})
export class MosaicEditorialComponent implements AfterViewInit, OnDestroy {

  private platformId = inject(PLATFORM_ID);
  private observer: IntersectionObserver | null = null;

  headerVisible = signal(false);
  panelVisible  = signal<Record<string, boolean>>({
    a: false, b: false, c: false, d: false, e: false, f: false,
  });

  private host = inject(ElementRef);
  asset = inject(AssetService);

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.initObserver();
  }

  private initObserver(): void {
    const root = this.host.nativeElement as HTMLElement;

    const revealSequence = [
      { selector: '.mosaic__header-inner', key: 'header', delay: 0 },
      { selector: '.mosaic__panel--primary',   key: 'a', delay: 150 },
      { selector: '.mosaic__panel--arabic',    key: 'b', delay: 300 },
      { selector: '.mosaic__panel--secondary', key: 'c', delay: 200 },
      { selector: '.mosaic__panel--copy',      key: 'd', delay: 350 },
      { selector: '.mosaic__panel--tertiary',  key: 'e', delay: 250 },
      { selector: '.mosaic__panel--quote',     key: 'f', delay: 400 },
    ];

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const key = (entry.target as HTMLElement).dataset['revealKey'];
          const item = revealSequence.find(r => r.key === key);
          if (!item) return;

          setTimeout(() => {
            if (key === 'header') {
              this.headerVisible.set(true);
            } else {
              this.panelVisible.update(prev => ({ ...prev, [key as string]: true }));
            }
          }, item.delay);

          this.observer?.unobserve(entry.target);
        });
      },
      { threshold: 0.12 }
    );

    revealSequence.forEach(({ selector, key }) => {
      const el = root.querySelector(selector) as HTMLElement | null;
      if (el) {
        el.dataset['revealKey'] = key;
        this.observer!.observe(el);
      }
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
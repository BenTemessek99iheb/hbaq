import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  PLATFORM_ID,
  inject,
  signal,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import { isPlatformBrowser, NgClass, NgFor, NgIf } from '@angular/common';

export interface CollectionChapter {
  id: string;
  chapter: string;         // Roman numeral
  title: string;
  titleItalic: string;
  arabicAccent: string;    // Short Arabic word / phrase
  narrative: string;       // Artistic description
  culture: string;         // Cultural inspiration note
  silhouette: string;      // Silhouette / garment description
  imageUrl: string;
  imageAlt: string;
  orientation: 'portrait' | 'landscape';
  tag: string;             // e.g. "Resort Shirt"
}

@Component({
  selector: 'app-collection-preview',
  standalone: true,
  imports: [NgClass, NgFor, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="collection" aria-label="HBAQ SS 2025 Collection Presentation">

      <!-- Section header -->
      <header class="collection__header">
        <div class="collection__header-rule" aria-hidden="true"></div>
        <div class="collection__header-content"
             [ngClass]="{ 'collection__header-content--visible': headerVisible() }">
          <span class="collection__season">SS 2025 — Collection One</span>
          <h2 class="collection__title">
            <span>Six</span>
            <em>Chapters</em>
          </h2>
          <p class="collection__intro">
            Each garment is a chapter.<br>
            Each stitch, a word in an ancient language<br>
            <em>spoken again for the first time.</em>
          </p>
        </div>
      </header>

      <!-- Collection chapters -->
      <div class="collection__chapters">
        <article
          class="collection__chapter"
          *ngFor="let item of chapters(); let i = index"
          [ngClass]="{
            'collection__chapter--visible': chapterVisible()[item.id],
            'collection__chapter--even': i % 2 === 1,
            'collection__chapter--portrait': item.orientation === 'portrait'
          }"
          [attr.data-chapter]="item.chapter"
        >
          <!-- Image side -->
          <div class="collection__chapter-visual">
            <div class="collection__chapter-img-frame">
              <img
                [src]="item.imageUrl"
                [alt]="item.imageAlt"
                class="collection__chapter-img"
                loading="lazy"
              />
              <div class="collection__chapter-img-overlay"></div>
              <!-- Arabic accent floating -->
              <div class="collection__chapter-arabic-float" lang="ar" dir="rtl"
                   aria-hidden="true">
                {{ item.arabicAccent }}
              </div>
            </div>
            <!-- Chapter number -->
            <div class="collection__chapter-number" aria-label="Chapter {{ item.chapter }}">
              {{ item.chapter }}
            </div>
          </div>

          <!-- Text side -->
          <div class="collection__chapter-text">
            <header class="collection__chapter-header">
              <span class="collection__chapter-tag">{{ item.tag }}</span>
              <h3 class="collection__chapter-title">
                {{ item.title }}<br>
                <em>{{ item.titleItalic }}</em>
              </h3>
            </header>

            <div class="collection__chapter-rule"></div>

            <div class="collection__chapter-body">
              <p class="collection__chapter-narrative">
                {{ item.narrative }}
              </p>

              <dl class="collection__chapter-details">
                <div class="collection__chapter-detail">
                  <dt>Cultural Origin</dt>
                  <dd>{{ item.culture }}</dd>
                </div>
                <div class="collection__chapter-detail">
                  <dt>Silhouette</dt>
                  <dd>{{ item.silhouette }}</dd>
                </div>
              </dl>
            </div>

            <div class="collection__chapter-footer">
              <a href="/collection/{{ item.id }}" class="collection__chapter-link">
                <span>Discover</span>
                <svg width="32" height="1" viewBox="0 0 32 1" aria-hidden="true">
                  <line x1="0" y1="0.5" x2="32" y2="0.5"
                        stroke="currentColor" stroke-width="0.75"/>
                </svg>
              </a>
              <span class="collection__chapter-label-ar" lang="ar" dir="rtl">
                {{ item.arabicAccent }}
              </span>
            </div>
          </div>
        </article>
      </div>

      <!-- CTA footer -->
      <div class="collection__cta-row"
           [ngClass]="{ 'collection__cta-row--visible': ctaVisible() }">
        <div class="collection__cta-line" aria-hidden="true"></div>
        <div class="collection__cta-inner">
          <p class="collection__cta-text">
            The full collection is a living archive.<br>
            <em>Each piece exists only once in its story.</em>
          </p>
          <a href="/collection" class="collection__cta-btn">
            View Full Collection
          </a>
        </div>
        <div class="collection__cta-ornament" aria-hidden="true">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="22" stroke="#C9993A" stroke-width="0.5" opacity="0.3"/>
            <path d="M24 6 L26 22 L42 24 L26 26 L24 42 L22 26 L6 24 L22 22 Z"
                  fill="#C9993A" opacity="0.25"/>
          </svg>
        </div>
      </div>

    </section>
  `,
  styleUrls: ['./collection-preview.component.scss'],
})
export class CollectionPreviewComponent implements AfterViewInit, OnDestroy {

  private platformId = inject(PLATFORM_ID);
  private host       = inject(ElementRef);
  private observer: IntersectionObserver | null = null;

  headerVisible  = signal(false);
  ctaVisible     = signal(false);
  chapterVisible = signal<Record<string, boolean>>({});

  chapters = signal<CollectionChapter[]>([
    {
      id: 'narrative-panel-shirt',
      chapter: 'I',
      title: 'The Narrative Panel',
      titleItalic: 'Oversized Resort Shirt',
      arabicAccent: 'روايـة',
      narrative:
        'A canvas before it is a garment. Each panel carries a printed narrative — part ancient map, part contemporary poem — referencing the trade routes that once connected Carthage to the Silk Road. Worn open, it breathes like a sail on the Mediterranean.',
      culture: 'Tunisian fresco · Silk Road cartography · Phoenician maritime tradition',
      silhouette: 'Oversized boxy fit · dropped shoulder · single chest pocket · camp collar',
      imageUrl: 'assets/images/collection/narrative-panel-shirt.png',
      imageAlt: 'HBAQ Narrative Panel Oversized Resort Shirt — editorial campaign',
      orientation: 'portrait',
      tag: 'Resort Shirt',
    },
    {
      id: 'tunisian-japanese-kimono',
      chapter: 'II',
      title: 'Tunisian-Japanese Fusion',
      titleItalic: 'Ample Kimono',
      arabicAccent: 'كيمونو',
      narrative:
        'Two islands of craft, separated by continents, united in cloth. The Okinawan tradition of Bingata dye meets Sfaxian embroidery patterns in a garment that asks: what if the trade routes had never been interrupted? A robe of hypothetical history.',
      culture: 'Japanese Bingata dyeing · Sfaxian embroidery · Afro-Asiatic textile crossroads',
      silhouette: 'Ample draped kimono silhouette · wide sleeves · open front · floor-length',
      imageUrl: 'assets/images/collection/tunisian-japanese-kimono.png',
      imageAlt: 'HBAQ Tunisian-Japanese Fusion Ample Kimono — editorial campaign',
      orientation: 'landscape',
      tag: 'Fusion Kimono',
    },
    {
      id: 'longline-duster-abaya',
      chapter: 'III',
      title: 'Longline Open Duster',
      titleItalic: 'Modern Abaya',
      arabicAccent: 'عباءة',
      narrative:
        'The abaya rewritten — not as a garment of concealment, but of declaration. Elongated to the ankles, open at the front, its architecture references the colonnades of El Jem. To wear it is to walk within a monument.',
      culture: 'North African Islamic dress · Roman colonnade architecture · contemporary wabi-sabi',
      silhouette: 'Longline open duster · relaxed column · collarless · oversized dropped shoulder',
      imageUrl: 'assets/images/collection/longline-duster-abaya.png',
      imageAlt: 'HBAQ Longline Open Duster / Modern Abaya — editorial campaign',
      orientation: 'portrait',
      tag: 'Modern Abaya',
    },
    {
      id: 'cubano-camp-shirt',
      chapter: 'IV',
      title: 'Cubano / Camp Collar',
      titleItalic: 'Short Sleeve Button Down',
      arabicAccent: 'كوبانو',
      narrative:
        'Cienfuegos meets Sidi Bou Said. The camp collar — beloved in Havana and the Medina alike — becomes a vessel for Berber geometric print. A garment that understands that the Caribbean and the Mediterranean have always shared the same sun.',
      culture: 'Cuban guayabera · Berber geometric ornament · Mediterranean resort tradition',
      silhouette: 'Relaxed short sleeve · camp collar · front button placket · chest pockets',
      imageUrl: 'assets/images/collection/cubano-camp-shirt.png',
      imageAlt: 'HBAQ Cubano Camp Collar Short Sleeve — editorial campaign',
      orientation: 'landscape',
      tag: 'Camp Collar Shirt',
    },
    {
      id: 'split-neck-henley-tunic',
      chapter: 'V',
      title: 'Split-Neck Graphic Henley',
      titleItalic: 'V-Neck Tunic',
      arabicAccent: 'تونيكا',
      narrative:
        'The tunic is the oldest garment. Here it is reborn with graphic prints drawn from sub-Saharan Adinkra symbols layered over Kufic lattices. A spiritual geometry you wear against your skin.',
      culture: 'Ghanaian Adinkra symbolism · Kufic geometric calligraphy · ancient tunic tradition',
      silhouette: 'Relaxed tunic length · split neck or V-neck · boxy body · minimal seaming',
      imageUrl: 'assets/images/collection/split-neck-tunic.png',
      imageAlt: 'HBAQ Split-Neck Graphic Henley / V-Neck Tunic — editorial campaign',
      orientation: 'portrait',
      tag: 'Graphic Tunic',
    },
    {
      id: 'artisan-dropped-shoulder-shirt',
      chapter: 'VI',
      title: 'Oversized Artisan',
      titleItalic: 'Dropped-Shoulder Button-Up',
      arabicAccent: 'حرفيّ',
      narrative:
        'The most humble and most radical of the collection. An oversized button-up that wears its artisan references openly — visible stitching, natural dye imperfections, hand-blocked stamps. Its slowness is its luxury.',
      culture: 'Artisan craft tradition · Mediterranean slow fashion · natural dye culture',
      silhouette: 'Oversized relaxed fit · deep dropped shoulder · generous hem · visible craftsmanship',
      imageUrl: 'assets/images/collection/artisan-dropped-shoulder.png',
      imageAlt: 'HBAQ Oversized Artisan Dropped-Shoulder Button-Up — editorial campaign',
      orientation: 'landscape',
      tag: 'Artisan Shirt',
    },
  ]);

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.initObserver();
  }

  private initObserver(): void {
    const root = this.host.nativeElement as HTMLElement;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const key = (entry.target as HTMLElement).dataset['observeKey'];
          if (!key) return;

          if (key === 'header') {
            setTimeout(() => this.headerVisible.set(true), 80);
          } else if (key === 'cta') {
            setTimeout(() => this.ctaVisible.set(true), 80);
          } else {
            const idx = parseInt(key, 10);
            setTimeout(() => {
              this.chapterVisible.update(prev => ({
                ...prev,
                [this.chapters()[idx]?.id]: true,
              }));
            }, idx * 80);
          }

          this.observer?.unobserve(entry.target);
        });
      },
      { threshold: 0.08 }
    );

    // Observe header
    const header = root.querySelector('.collection__header-content') as HTMLElement | null;
    if (header) {
      header.dataset['observeKey'] = 'header';
      this.observer.observe(header);
    }

    // Observe each chapter
    root.querySelectorAll('.collection__chapter').forEach((el, idx) => {
      (el as HTMLElement).dataset['observeKey'] = String(idx);
      this.observer!.observe(el);
    });

    // Observe CTA
    const cta = root.querySelector('.collection__cta-row') as HTMLElement | null;
    if (cta) {
      cta.dataset['observeKey'] = 'cta';
      this.observer.observe(cta);
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
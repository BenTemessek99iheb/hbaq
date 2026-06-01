import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  PLATFORM_ID,
  inject,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { isPlatformBrowser, NgClass, NgFor } from '@angular/common';

export interface HeritageChapter {
  number: string;        // Roman numeral
  title: string;
  arabicTitle?: string;
  body: string[];        // paragraphs
  pull?: string;         // pull-quote
}

@Component({
  selector: 'app-heritage-story',
  standalone: true,
  imports: [NgClass, NgFor],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="heritage" aria-label="HBAQ — Heritage Story">

      <!-- ──────────────────────────────────────────────
           MONUMENTAL ARABIC HERO COMPOSITION
           ────────────────────────────────────────────── -->
      <div class="heritage__arabic-hero"
           [ngClass]="{ 'heritage__arabic-hero--visible': heroVisible() }"
           aria-label="الحبق — Al-Ḥabaq">

        <!-- Kufic geometric construction grid -->
        <div class="heritage__kufic-grid" aria-hidden="true">
          <svg class="heritage__kufic-svg"
               viewBox="0 0 1000 600"
               preserveAspectRatio="xMidYMid slice"
               xmlns="http://www.w3.org/2000/svg">

            <!-- Outer frame -->
            <rect x="40" y="30" width="920" height="540"
                  fill="none" stroke="#C9993A"
                  stroke-width="0.5" opacity="0.12"
                  stroke-dasharray="6 10"/>

            <!-- Inner frame -->
            <rect x="80" y="60" width="840" height="480"
                  fill="none" stroke="#C9993A"
                  stroke-width="0.3" opacity="0.08"/>

            <!-- Vertical axes -->
            <line x1="500" y1="30" x2="500" y2="570"
                  stroke="#C9993A" stroke-width="0.4" opacity="0.10"/>
            <!-- Horizontal axis -->
            <line x1="40" y1="300" x2="960" y2="300"
                  stroke="#C9993A" stroke-width="0.4" opacity="0.10"/>

            <!-- Eight-point star at center -->
            <g transform="translate(500 300)" opacity="0.12">
              <polygon points="0,-90 18,-18 90,0 18,18 0,90 -18,18 -90,0 -18,-18"
                       fill="none" stroke="#C9993A" stroke-width="0.6"/>
              <polygon points="0,-64 64,-64 64,0 64,64 0,64 -64,64 -64,0 -64,-64"
                       fill="none" stroke="#C9993A" stroke-width="0.4"
                       transform="rotate(45)"/>
              <circle r="45" fill="none" stroke="#C9993A" stroke-width="0.3"/>
              <circle r="100" fill="none" stroke="#C9993A" stroke-width="0.25"
                      stroke-dasharray="2 6"/>
            </g>

            <!-- Corner rosettes -->
            <g transform="translate(120 90)" opacity="0.10">
              <circle r="20" fill="none" stroke="#C9993A" stroke-width="0.5"/>
              <line x1="-20" y1="0" x2="20" y2="0" stroke="#C9993A" stroke-width="0.4"/>
              <line x1="0" y1="-20" x2="0" y2="20" stroke="#C9993A" stroke-width="0.4"/>
            </g>
            <g transform="translate(880 90)" opacity="0.10">
              <circle r="20" fill="none" stroke="#C9993A" stroke-width="0.5"/>
              <line x1="-20" y1="0" x2="20" y2="0" stroke="#C9993A" stroke-width="0.4"/>
              <line x1="0" y1="-20" x2="0" y2="20" stroke="#C9993A" stroke-width="0.4"/>
            </g>
            <g transform="translate(120 510)" opacity="0.10">
              <circle r="20" fill="none" stroke="#C9993A" stroke-width="0.5"/>
              <line x1="-20" y1="0" x2="20" y2="0" stroke="#C9993A" stroke-width="0.4"/>
              <line x1="0" y1="-20" x2="0" y2="20" stroke="#C9993A" stroke-width="0.4"/>
            </g>
            <g transform="translate(880 510)" opacity="0.10">
              <circle r="20" fill="none" stroke="#C9993A" stroke-width="0.5"/>
              <line x1="-20" y1="0" x2="20" y2="0" stroke="#C9993A" stroke-width="0.4"/>
              <line x1="0" y1="-20" x2="0" y2="20" stroke="#C9993A" stroke-width="0.4"/>
            </g>

            <!-- Tessellation accent strips -->
            <g opacity="0.06" stroke="#C9993A" stroke-width="0.3">
              <line x1="40"  y1="150" x2="960" y2="150"/>
              <line x1="40"  y1="450" x2="960" y2="450"/>
              <line x1="200" y1="30"  x2="200" y2="570"/>
              <line x1="800" y1="30"  x2="800" y2="570"/>
            </g>
          </svg>
        </div>

        <!-- The monumental Arabic word -->
        <div class="heritage__arabic-word" lang="ar" dir="rtl">
          الحبق
        </div>

        <!-- Romanisation + Meaning -->
        <div class="heritage__arabic-meta">
          <div class="heritage__arabic-meta-left">
            <span class="heritage__arabic-romanized">Al-Ḥabaq</span>
            <span class="heritage__arabic-phonetic">/ al-ħa.baq /</span>
          </div>
          <div class="heritage__arabic-meta-divider" aria-hidden="true"></div>
          <div class="heritage__arabic-meta-right">
            <span class="heritage__arabic-pos">noun, masculine · Arabic</span>
            <span class="heritage__arabic-def">Sacred Basil · Memory · Heritage</span>
          </div>
        </div>

        <!-- Section eyebrow -->
        <div class="heritage__eyebrow">
          <span class="heritage__eyebrow-line" aria-hidden="true"></span>
          <span class="heritage__eyebrow-text">The Heritage Story</span>
          <span class="heritage__eyebrow-line" aria-hidden="true"></span>
        </div>

      </div>

      <!-- ──────────────────────────────────────────────
           STORY CHAPTERS
           ────────────────────────────────────────────── -->
      <div class="heritage__story">

        <article
          class="heritage__chapter"
          *ngFor="let chapter of chapters(); let i = index"
          [ngClass]="{ 'heritage__chapter--visible': chapterVisible()[chapter.number] }"
          [attr.aria-label]="'Chapter ' + chapter.number + ' — ' + chapter.title"
        >

          <!-- Chapter number + title -->
          <header class="heritage__chapter-header">
            <div class="heritage__chapter-numeral" aria-hidden="true">
              {{ chapter.number }}
            </div>
            <div class="heritage__chapter-titles">
              <span class="heritage__chapter-label">Chapter {{ chapter.number }}</span>
              <h3 class="heritage__chapter-title">{{ chapter.title }}</h3>
            @if (chapter.arabicTitle) {
  <span class="heritage__chapter-title-ar" lang="ar" dir="rtl">
    {{ chapter.arabicTitle }}
  </span>
}

            </div>
          </header>

          <!-- Body paragraphs -->
          <div class="heritage__chapter-body">
            <p
              class="heritage__chapter-para"
              *ngFor="let para of chapter.body"
            >{{ para }}</p>

            <!-- Pull-quote -->
            <blockquote class="heritage__chapter-pull" *ngIf="chapter.pull">
              <div class="heritage__chapter-pull-bar" aria-hidden="true"></div>
              <p>{{ chapter.pull }}</p>
            </blockquote>
          </div>

          <!-- Chapter separator ornament -->
          <div class="heritage__chapter-sep" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2 L13 11 L22 12 L13 13 L12 22 L11 13 L2 12 L11 11 Z"
                    fill="#C9993A" opacity="0.3"/>
            </svg>
          </div>

        </article>

      </div>

      <!-- ──────────────────────────────────────────────
           MANIFESTO CLOSE — Full-width Arabic + EN
           ────────────────────────────────────────────── -->
      <div class="heritage__manifesto"
           [ngClass]="{ 'heritage__manifesto--visible': manifestoVisible() }">

        <div class="heritage__manifesto-inner">
          <!-- Large ornamental Arabic -->
          <div class="heritage__manifesto-arabic" lang="ar" dir="rtl" aria-hidden="true">
            الحبق
          </div>

          <div class="heritage__manifesto-text">
            <p class="heritage__manifesto-heading">
              Heritage is not a museum.<br>
              <em>It is something you wear.</em>
            </p>
            <p class="heritage__manifesto-body">
              HBAQ was born from the conviction that clothing can be an act of cultural memory.
              That a garment, worn on the body in the present, can carry within its fibres the weight
              and light of centuries — African, Arab, Mediterranean, universal.
            </p>
            <div class="heritage__manifesto-rule"></div>
            <a href="/about" class="heritage__manifesto-link">
              <span>Read the full story</span>
              <svg width="40" height="1" viewBox="0 0 40 1" aria-hidden="true">
                <line x1="0" y1="0.5" x2="40" y2="0.5"
                      stroke="currentColor" stroke-width="0.75"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Corner bracket decoration -->
        <div class="heritage__manifesto-bracket heritage__manifesto-bracket--nw"
             aria-hidden="true"></div>
        <div class="heritage__manifesto-bracket heritage__manifesto-bracket--se"
             aria-hidden="true"></div>

      </div>

    </section>
  `,
  styleUrls: ['./heritage-story.component.scss'],
})
export class HeritageStoryComponent implements AfterViewInit, OnDestroy {

  private platformId = inject(PLATFORM_ID);
  private host       = inject(ElementRef);
  private observer: IntersectionObserver | null = null;

  heroVisible      = signal(false);
  manifestoVisible = signal(false);
  chapterVisible   = signal<Record<string, boolean>>({});

  chapters = signal<HeritageChapter[]>([
    {
      number: 'I',
      title: 'The Name',
      arabicTitle: 'الاسم',
      body: [
        'الحبق — Al-Ḥabaq. Sacred basil. In Arabic botanical tradition, the herb of memory, of hospitality, of the threshold between the living and the remembered. Placed at the graves of the departed. Grown beside the entrance of homes. Carried by travellers as protection.',
        'We chose this name not for its fragrance — though it carries one. We chose it because it encodes an entire world of meaning in four letters. A name that could only exist in Arabic. A name that refuses to be fully translated.',
        'When you translate الحبق, you lose something essential. That untranslatability is the brand. It is what we are trying to recover: the things that survive only in their original language, their original form, their original cloth.',
      ],
      pull: '"Some words carry more history than entire books. الحبق is one of them."',
    },
    {
      number: 'II',
      title: 'The Mediterranean Crossroads',
      arabicTitle: 'مفترق البحر',
      body: [
        'Tunisia is not simply a country on a map. It is a crossroads that has been accumulating civilisations for three thousand years. Berber, Phoenician, Carthaginian, Roman, Vandal, Byzantine, Arab, Ottoman, French — each empire passed through and left something behind in the soil, in the stone, in the language, in the weave.',
        'HBAQ begins here: in the acknowledgement that this layering is not a wound. It is a richness. It is the raw material of a brand that refuses to choose between its inheritances.',
        'Our first collection is an atlas of this crossroads — each garment a different coastline, a different trade route, a different cultural confluence rendered in linen and geometry.',
      ],
      pull: 'Tunisia is not a location. It is an argument about the nature of civilisation.',
    },
    {
      number: 'III',
      title: 'Afro-Asiatic Dialogue',
      arabicTitle: 'الحوار الأفرو-آسيوي',
      body: [
        'The academic term is Afro-Asiatic: the language family that connects Arabic, Amharic, Hausa, Berber, Hebrew, Somali. Languages that carry cognates across continents, across the Sahara, across the Red Sea — the linguistic evidence that Africa and Asia have always been in conversation.',
        'Our design language honours this dialogue. African Adinkra symbols speak to Kufic geometric calligraphy. Sub-Saharan weaving traditions rhyme with East Asian textile arts. The Sahara is not a wall but a road — the oldest trade route in the world.',
        'Every HBAQ garment is an Afro-Asiatic sentence: grammatically African, syntactically Arab, dressed in a contemporary vocabulary.',
      ],
    },
    {
      number: 'IV',
      title: 'Contemporary Reinterpretation',
      arabicTitle: 'إعادة التفسير',
      body: [
        'Heritage without reinterpretation is a museum. We are not interested in reproduction. We are interested in conversation: What does Kufic geometry look like when printed on an oversized linen shirt? What happens when Tunisian embroidery patterns meet Japanese kimono construction? What emerges from the encounter?',
        'The answer is always surprising. Always beautiful. Always unmistakably HBAQ.',
        'Contemporary reinterpretation means we do not copy our ancestors. We continue their project: the project of making meaning through cloth, through colour, through the decision to put one pattern beside another and see what they say to each other.',
      ],
      pull: 'We are not revivalists. We are translators — working across time rather than language.',
    },
    {
      number: 'V',
      title: 'The Future of Heritage',
      arabicTitle: 'مستقبل الإرث',
      body: [
        'The future of heritage is not preservation. It is proliferation. It is the decision to keep these visual languages alive not in museums but in closets, in streets, on bodies — in motion, in use, in life.',
        'Every time someone wears HBAQ, they carry forward a set of visual conversations that began millennia ago. They become, briefly, a living archive. An embodied history.',
        'This is the mission of the maison: to make the inheritance of the Mediterranean, of Africa, of the Arab world wearable. Not as costume. As culture. As self.',
      ],
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
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const key = (entry.target as HTMLElement).dataset['observeKey'];
          if (!key) return;

          if (key === 'hero') {
            setTimeout(() => this.heroVisible.set(true), 100);
          } else if (key === 'manifesto') {
            setTimeout(() => this.manifestoVisible.set(true), 100);
          } else {
            setTimeout(() => {
              this.chapterVisible.update(prev => ({ ...prev, [key]: true }));
            }, 80);
          }

          this.observer?.unobserve(entry.target);
        });
      },
      { threshold: 0.08 }
    );

    const hero = root.querySelector('.heritage__arabic-hero') as HTMLElement | null;
    if (hero) { hero.dataset['observeKey'] = 'hero'; this.observer.observe(hero); }

    root.querySelectorAll('.heritage__chapter').forEach(el => {
      const numeral = el.querySelector('.heritage__chapter-numeral');
      const key     = numeral?.textContent?.trim() ?? '';
      (el as HTMLElement).dataset['observeKey'] = key;
      this.observer!.observe(el);
    });

    const manifesto = root.querySelector('.heritage__manifesto') as HTMLElement | null;
    if (manifesto) {
      manifesto.dataset['observeKey'] = 'manifesto';
      this.observer.observe(manifesto);
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
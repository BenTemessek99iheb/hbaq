import {
  Component,
  signal,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  PLATFORM_ID,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CloudinaryService } from '../../../../core/services/cloudinary.service';
import { MEDIA } from '../../../../core/media/media.registry';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [NgStyle, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="hero" #heroRef>

      <!-- Background — RAF-throttled parallax -->
      <div
        class="hero__bg"
        [ngStyle]="{ transform: 'scale(1.15) translateY(' + parallaxY() + 'px)' }"
      >
        <img
          [src]="cloudinary.hero(MEDIA.hero.main)"
          [srcset]="cloudinary.srcset(MEDIA.hero.main, [768, 1200, 1600, 2000])"
          sizes="100vw"
          alt=""
          width="1600"
          height="900"
          class="hero__bg-image"
          loading="eager"
          fetchpriority="high"
        />
        <div class="hero__vignette"></div>
      </div>

      <!-- Mediterranean morning light (pure CSS) -->
      <div class="hero__light-seep" aria-hidden="true"></div>

      <!-- Atmospheric Arabic ambient (CSS ::before only) -->
      <div class="hero__ambient" aria-hidden="true"></div>

      <!-- ── CONTENT ── -->
      <div class="hero__content">

        <!-- Bilingual season label -->
        <div class="hero__label" [class.visible]="contentVisible()">
          <span class="hero__label-ar" lang="ar" dir="rtl">مجموعة ربيع وصيف ٢٠٢٦</span>
          <span class="hero__label-sep" aria-hidden="true">—</span>
          <span class="hero__label-en">SS 2026 Collection</span>
        </div>

        <!-- Title — Arabic monumental + English poetic -->
        <h1 class="hero__title">
          <span
            class="hero__title-line hero__title-line--ar"
            [class.visible]="contentVisible()"
            style="--delay: 0.08s"
            lang="ar" dir="rtl"
          >من الأرض</span>

          <span
            class="hero__title-line hero__title-line--en"
            [class.visible]="contentVisible()"
            style="--delay: 0.22s"
          >we are made</span>

          <span
            class="hero__title-line hero__title-line--ar-secondary"
            [class.visible]="contentVisible()"
            style="--delay: 0.38s"
            lang="ar" dir="rtl"
          >وإلى الحرية نسير</span>
        </h1>

        <!-- Bilingual subtitle — poetic -->
        <div class="hero__subtitle" [class.visible]="contentVisible()" style="--delay: 0.58s">
          <p class="hero__subtitle-ar" lang="ar" dir="rtl">
            الحبق — عطر الأرض، وروح الحرية
          </p>
          <p class="hero__subtitle-en">
            The fragrance of the earth.<br>The spirit of freedom. Worn.
          </p>
        </div>

        <!-- CTA buttons — refined bilingual -->
        <div class="hero__cta" [class.visible]="contentVisible()" style="--delay: 0.78s">

          <a routerLink="/collection" class="hero__btn hero__btn--primary">
            <span class="hero__btn-ar" lang="ar" dir="rtl">اكتشف المجموعة</span>
            <span class="hero__btn-rule" aria-hidden="true"></span>
            <span class="hero__btn-en">Explore</span>
          </a>

          <a routerLink="/about" class="hero__btn hero__btn--ghost">
            <span class="hero__btn-ar" lang="ar" dir="rtl">قصتنا</span>
            <span class="hero__btn-rule" aria-hidden="true"></span>
            <span class="hero__btn-en">Our Story</span>
          </a>

        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="hero__scroll" [class.visible]="contentVisible()">
        <div class="hero__scroll-line"></div>
        <span>Scroll</span>
      </div>

      <!-- Brand continuity strip -->
      <div class="hero__mosaic-strip" aria-hidden="true"></div>

    </section>
  `,
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('heroRef') heroRef!: ElementRef<HTMLElement>;

  private platformId   = inject(PLATFORM_ID);
  protected cloudinary = inject(CloudinaryService);
  protected MEDIA      = MEDIA;

  parallaxY      = signal(0);
  contentVisible = signal(false);

  private rafPending = false;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    setTimeout(() => this.contentVisible.set(true), 200);
    window.addEventListener('scroll', this.onScroll, { passive: true });
  }

  private onScroll = (): void => {
    if (this.rafPending) return;
    this.rafPending = true;
    requestAnimationFrame(() => {
      const scrolled = window.scrollY;
      const heroH    = this.heroRef?.nativeElement.offsetHeight ?? 0;
      if (scrolled < heroH) this.parallaxY.set(scrolled * 0.3);
      this.rafPending = false;
    });
  };

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.onScroll);
    }
  }
}
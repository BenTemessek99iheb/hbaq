import {
  Component, signal, AfterViewInit,
  ElementRef, ViewChild, PLATFORM_ID, inject
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgStyle } from '@angular/common';
import { AssetService } from '../../../../core/services/asset.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [NgStyle],
  template: `
    <section class="hero" #heroRef>
      <div
        class="hero__bg"
        [ngStyle]="{ transform: 'scale(1.15) translateY(' + parallaxY() + 'px)' }"
      >
        <img
          [src]="asset.url('assets/images/hero/hero-main.jpg')"
          alt=""
          class="hero__bg-image"
          loading="eager"
          fetchpriority="high"
        />
        <div class="hero__mosaic-overlay"></div>
        <div class="hero__vignette"></div>
      </div>

      <div class="hero__grain" aria-hidden="true"></div>

      <div class="hero__content">
        <div class="hero__label" [class.visible]="contentVisible()">
          <span>— SS 2025 Collection</span>
        </div>
        <h1 class="hero__title">
          <span class="hero__title-line" [class.visible]="contentVisible()" style="--delay: 0.1s">
            Born from
          </span>
          <span class="hero__title-line hero__title-line--italic" [class.visible]="contentVisible()" style="--delay: 0.2s">
            Ancient Earth
          </span>
        </h1>
        <p class="hero__subtitle" [class.visible]="contentVisible()" style="--delay: 0.5s">
          Crafted in the spirit of Carthage.<br>
          Worn for the present.
        </p>
        <div class="hero__cta" [class.visible]="contentVisible()" style="--delay: 0.7s">
          <a routerLink="/collection" class="hero__btn hero__btn--primary">Explore Collection</a>
          <a routerLink="/about"      class="hero__btn hero__btn--ghost">Our Story</a>
        </div>
      </div>

      <div class="hero__scroll" [class.visible]="contentVisible()">
        <div class="hero__scroll-line"></div>
        <span>Scroll</span>
      </div>

      <div class="hero__mosaic-strip" aria-hidden="true"></div>
    </section>
  `,
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements AfterViewInit {
  @ViewChild('heroRef') heroRef!: ElementRef<HTMLElement>;

  private platformId = inject(PLATFORM_ID);
  asset = inject(AssetService);

  parallaxY      = signal(0);
  contentVisible = signal(false);

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    setTimeout(() => this.contentVisible.set(true), 200);

    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const heroH    = this.heroRef.nativeElement.offsetHeight;
      if (scrolled < heroH) {
        this.parallaxY.set(scrolled * 0.3);
      }
    }, { passive: true });
  }
}
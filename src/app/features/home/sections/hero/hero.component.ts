import {
  Component, OnInit, signal, AfterViewInit,
  ElementRef, ViewChild, PLATFORM_ID, inject
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [NgStyle],
  template: `
    <section class="hero" #heroRef>
      <!-- Background image with parallax -->
      <div
        class="hero__bg"
        [ngStyle]="{ transform: 'scale(1.15) translateY(' + (parallaxY()) + 'px)' }"
      >
        <img
          src="assets/images/hero/hero-main.jpg"
          alt=""
          class="hero__bg-image"
          loading="eager"
          fetchpriority="high"
        />
        <!-- Mosaic texture overlay -->
        <div class="hero__mosaic-overlay"></div>
        <!-- Gradient vignette -->
        <div class="hero__vignette"></div>
      </div>

      <!-- Grain overlay -->
      <div class="hero__grain" aria-hidden="true"></div>

      <!-- Content -->
      <div class="hero__content">
        <!-- Editorial label -->
        <div class="hero__label" [class.visible]="contentVisible()">
          <span>— SS 2025 Collection</span>
        </div>

        <!-- Main headline -->
        <h1 class="hero__title">
          <span class="hero__title-line" [class.visible]="contentVisible()" style="--delay: 0.1s">
            Born from
          </span>
          <span class="hero__title-line hero__title-line--italic" [class.visible]="contentVisible()" style="--delay: 0.2s">
            Ancient Earth
          </span>
        </h1>

        <!-- Subtext -->
        <p class="hero__subtitle" [class.visible]="contentVisible()" style="--delay: 0.5s">
          Crafted in the spirit of Carthage.<br>
          Worn for the present.
        </p>

        <!-- CTA group -->
        <div class="hero__cta" [class.visible]="contentVisible()" style="--delay: 0.7s">
          <a href="/collection" class="hero__btn hero__btn--primary">
            Explore Collection
          </a>
          <a href="/about" class="hero__btn hero__btn--ghost">
            Our Story
          </a>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="hero__scroll" [class.visible]="contentVisible()">
        <div class="hero__scroll-line"></div>
        <span>Scroll</span>
      </div>

      <!-- Bottom mosaic strip -->
      <div class="hero__mosaic-strip" aria-hidden="true"></div>
    </section>
  `,
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements AfterViewInit {
  @ViewChild('heroRef') heroRef!: ElementRef<HTMLElement>;

  private platformId = inject(PLATFORM_ID);

  parallaxY      = signal(0);
  contentVisible = signal(false);

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Staggered content reveal
    setTimeout(() => this.contentVisible.set(true), 200);

    // Parallax on scroll
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const heroH    = this.heroRef.nativeElement.offsetHeight;
      if (scrolled < heroH) {
        this.parallaxY.set(scrolled * 0.3);
      }
    }, { passive: true });
  }
}
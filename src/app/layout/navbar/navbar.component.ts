import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';
import { ScrollService } from '../../core/services/scroll.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,  NgClass],
  template: `
    <nav
      [ngClass]="{
        'nav--scrolled': isScrolled(),
        'nav--hidden':   isHidden()
      }"
      class="nav"
    >
      <!-- Left: Nav links -->
      <ul class="nav__links">
        <li><a routerLink="/collection" class="nav__link">Collection</a></li>
        <li><a routerLink="/about" class="nav__link">Atelier</a></li>
      </ul>

      <!-- Center: Logo -->
    <a routerLink="/" class="nav__logo">
  <span class="nav__logo-text" lang="ar" dir="rtl">الحبق</span>
</a>

      <!-- Right: Actions -->
      <div class="nav__actions">
        <button class="nav__link" aria-label="Search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </button>
        <button class="nav__link nav__cart" aria-label="Cart">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <span class="nav__cart-count">0</span>
        </button>
      </div>
    </nav>
  `,
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  private scroll = inject(ScrollService);

  isScrolled = computed(() => this.scroll.scrollY() > 80);
  isHidden   = computed(() =>
    this.scroll.scrollY() > 300 && this.scroll.scrollDir() === 'down'
  );
}
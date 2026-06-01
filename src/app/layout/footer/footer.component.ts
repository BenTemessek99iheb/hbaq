import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="footer">
      <!-- Mosaic top border -->
      <div class="footer__mosaic-top" aria-hidden="true"></div>

      <div class="footer__inner">
        <!-- Brand -->
        <div class="footer__brand">
          <p class="footer__brand-name">CARTHAGE STUDIO</p>
          <p class="footer__brand-tagline">
            Born from ancient earth.<br>Worn for the present.
          </p>
        </div>

        <!-- Navigation columns -->
        <div class="footer__nav">
          <div class="footer__col">
            <h4 class="footer__col-title">Shop</h4>
            <ul class="footer__links">
              <li><a routerLink="/collection" class="footer__link">New Arrivals</a></li>
              <li><a routerLink="/collection" class="footer__link">T-Shirts</a></li>
              <li><a routerLink="/collection" class="footer__link">Hoodies</a></li>
              <li><a routerLink="/collection" class="footer__link">Jackets</a></li>
              <li><a routerLink="/collection" class="footer__link">Accessories</a></li>
            </ul>
          </div>
          <div class="footer__col">
            <h4 class="footer__col-title">Studio</h4>
            <ul class="footer__links">
              <li><a routerLink="/about" class="footer__link">Our Story</a></li>
              <li><a routerLink="/about" class="footer__link">Craftsmanship</a></li>
              <li><a routerLink="/about" class="footer__link">Sustainability</a></li>
            </ul>
          </div>
        </div>

        <!-- Newsletter -->
        <div class="footer__newsletter">
          <p class="footer__newsletter-label">Join the archive</p>
          <div class="footer__newsletter-form">
            <input
              type="email"
              placeholder="your@email.com"
              class="footer__newsletter-input"
              aria-label="Email for newsletter"
            />
            <button class="footer__newsletter-btn" aria-label="Subscribe">→</button>
          </div>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="footer__bottom">
        <p class="footer__copy">© 2025 Carthage Studio. All rights reserved.</p>
        <p class="footer__origin">Made in Tunisia 🇹🇳</p>
      </div>
    </footer>
  `,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {}
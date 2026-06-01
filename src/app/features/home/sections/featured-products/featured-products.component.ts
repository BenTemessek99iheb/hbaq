import { Component, inject } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InViewDirective } from '../../../../shared/directives/in-view.directive';
import { AssetService } from '../../../../core/services/asset.service';

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  size: 'large' | 'medium' | 'small';
  tag?: string;
  styleVibe?: string;
}

@Component({
  selector: 'app-featured-products',
  standalone: true,
  imports: [NgClass, RouterLink, InViewDirective],
  template: `
    <section class="featured">
      <header class="featured__header" (inView)="headerVisible = true" [class.visible]="headerVisible">
        <span class="featured__label">New Arrivals</span>
        <h2 class="featured__title">The Collection</h2>
        <a routerLink="/collection" class="featured__all">View all →</a>
      </header>

      <div class="featured__grid">
        @for (product of products; track product.id; let i = $index) {
          <article
            class="product-card"
            [ngClass]="'product-card--' + product.size"
            (inView)="product['visible'] = true"
            [class.visible]="product['visible']"
            [style.--stagger]="(i * 0.1) + 's'"
          >
            <a [routerLink]="['/product', product.id]" class="product-card__link">
              <div class="product-card__image-wrap">
                <img
                  [src]="asset.url(product.image)"
                  [alt]="product.name"
                  class="product-card__image"
                  loading="lazy"
                />
                @if (product.tag) {
                  <span class="product-card__tag">{{ product.tag }}</span>
                }
                <div class="product-card__overlay">
                  <span class="product-card__quick-add">Add to cart</span>
                </div>
              </div>
              <footer class="product-card__info">
                <span class="product-card__category">{{ product.category }}</span>
                <h3 class="product-card__name">{{ product.name }}</h3>
                <span class="product-card__price">{{ product.price }}</span>
              </footer>
            </a>
          </article>
        }
      </div>
    </section>
  `,
  styleUrls: ['./featured-products.component.scss']
})
export class FeaturedProductsComponent {
  // Inject AssetService — available in template as `asset`
  asset = inject(AssetService);
  headerVisible = false;

  products: (Product & { visible?: boolean })[] = [
    {
      id: 'oversized-tee-01',
      name: 'Kerkouane Tee',
      category: 'Oversized T-Shirt',
      price: '89 TND',
      image: 'assets/images/products/p1.jpg',
      size: 'large',
      tag: 'New',
      styleVibe: 'Afro-Asiatic Fusion / Chinoiserie-Tribal Dialogue'
    },
    {
      id: 'hoodie-01',
      name: 'Baal Hammon Hood',
      category: 'Heavyweight Hoodie',
      price: '190 TND',
      image: 'assets/images/products/p2.jpg',
      size: 'medium',
      styleVibe: 'Afro-Centric Tribal Fusion / Modern Resortwear'
    },
    {
      id: 'shirt-01',
      name: 'Tanit Shirt',
      category: 'Luxury Shirt',
      price: '145 TND',
      image: 'assets/images/products/p3.jpg',
      size: 'medium',
      tag: 'Limited',
      styleVibe: 'Minimalist Ethno-Luxury / Premium Loungewear'
    },
    {
      id: 'jacket-01',
      name: 'Carthage Coach',
      category: 'Light Jacket',
      price: '295 TND',
      image: 'assets/images/products/p4.jpg',
      size: 'large',
      styleVibe: 'Heritage Fusion / Conceptual Street-Tradition'
    }
  ];
}
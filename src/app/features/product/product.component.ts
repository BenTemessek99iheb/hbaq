import {
  Component, OnInit, OnDestroy, signal, computed,
  inject, ChangeDetectionStrategy, PLATFORM_ID
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgClass, NgFor, NgIf, isPlatformBrowser } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import {
  Product,
  ProductVariant,
  ProductReview,
  ProductImage,
  CATEGORY_LABELS
} from '../../core/models/product.model';

import { InViewDirective } from '../../shared/directives/in-view.directive';

@Component({
  selector: 'app-product',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, NgFor, NgIf, RouterLink, InViewDirective],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private platformId = inject(PLATFORM_ID);
  private destroy$ = new Subject<void>();

  // ── State ─────────────────────────────────────────────
  product = signal<Product | null>(null);
  selectedImage = signal(0);
  selectedVariant = signal<ProductVariant | null>(null);
  quantity = signal(1);
  activeTab = signal<'details' | 'reviews'>('details');
  addedToCart = signal(false);
  relatedProducts = signal<Product[]>([]);

  // ── Computed ──────────────────────────────────────────
  categoryLabel = computed(() => {
    const p = this.product();
    return p ? CATEGORY_LABELS[p.category] : '';
  });

  isInStock = computed(() => {
    const v = this.selectedVariant();
    return !!v && v.stock > 0;
  });

  isLowStock = computed(() => {
    const v = this.selectedVariant();
    return !!v && v.stock > 0 && v.stock <= 3;
  });

  discount = computed(() => {
    const p = this.product();
    if (!p?.originalPrice) return 0;
    return Math.round((1 - p.price / p.originalPrice) * 100);
  });

  stars = computed(() => {
    const rating = this.product()?.rating ?? 0;
    return Array.from({ length: 5 }, (_, i) => {
      if (i < Math.floor(rating)) return 'full';
      if (i < rating) return 'half';
      return 'empty';
    });
  });

  // ── Lifecycle ─────────────────────────────────────────
  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const id = params.get('id');
        if (!id) {
          this.router.navigate(['/collection']);
          return;
        }

        const product =
          this.productService.getById(id) ??
          this.productService.getBySlug(id);

        if (!product) {
          this.router.navigate(['/collection']);
          return;
        }

        this.product.set(product);
        this.selectedImage.set(0);
        this.quantity.set(1);

        const firstAvailable =
          product.variants?.find((v: ProductVariant) => v.stock > 0)
          ?? product.variants?.[0];

        this.selectedVariant.set(firstAvailable ?? null);

        if (product.relatedIds?.length) {
          this.relatedProducts.set(
            this.productService.getRelated(product.relatedIds)
          );
        }

        if (isPlatformBrowser(this.platformId)) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ── Actions ───────────────────────────────────────────
  selectVariant(v: ProductVariant): void {
    this.selectedVariant.set(v);
  }

  selectImage(i: number): void {
    this.selectedImage.set(i);
  }

  incrementQty(): void {
    const max = this.selectedVariant()?.stock ?? 1;
    this.quantity.update(q => Math.min(q + 1, max));
  }

  decrementQty(): void {
    this.quantity.update(q => Math.max(1, q - 1));
  }

  addToCart(): void {
    const product = this.product();
    const variant = this.selectedVariant();

    if (!product || !variant || !this.isInStock()) return;

    this.cartService.add(product, variant, this.quantity());
    this.addedToCart.set(true);

    setTimeout(() => this.addedToCart.set(false), 2000);
  }

  buyNow(): void {
    this.addToCart();
  }

  navigateToProduct(id: string): void {
    this.router.navigate(['/product', id]);
  }

  // ── Helpers ───────────────────────────────────────────
  formatPrice(price: number): string {
    return `${price} TND`;
  }

  trackByVariantId(_: number, v: ProductVariant): string {
    return v.id;
  }

  trackByReviewId(_: number, r: ProductReview): string {
    return r.id;
  }

  trackByImage(_: number, img: ProductImage): string {
    return img.url;
  }
}
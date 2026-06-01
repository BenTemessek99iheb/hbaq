import { Injectable, signal, computed } from '@angular/core';
import { CartItem, Product, ProductVariant } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly _items = signal<CartItem[]>([]);
  private readonly _open  = signal(false);

  // ── Public reads ─────────────────────────────────────────────────────────
  readonly items     = this._items.asReadonly();
  readonly isOpen    = this._open.asReadonly();

  readonly count = computed(() =>
    this._items().reduce((acc, item) => acc + item.quantity, 0)
  );

  readonly subtotal = computed(() =>
    this._items().reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  );

  // ── Actions ───────────────────────────────────────────────────────────────
  add(product: Product, variant: ProductVariant, qty = 1): void {
    const existing = this._items().find(
      i => i.product.id === product.id && i.variant.id === variant.id
    );
    if (existing) {
      this._items.update(items =>
        items.map(i =>
          i.product.id === product.id && i.variant.id === variant.id
            ? { ...i, quantity: i.quantity + qty }
            : i
        )
      );
    } else {
      this._items.update(items => [...items, { product, variant, quantity: qty }]);
    }
    this._open.set(true);
  }

  remove(productId: string, variantId: string): void {
    this._items.update(items =>
      items.filter(i => !(i.product.id === productId && i.variant.id === variantId))
    );
  }

  updateQty(productId: string, variantId: string, qty: number): void {
    if (qty <= 0) { this.remove(productId, variantId); return; }
    this._items.update(items =>
      items.map(i =>
        i.product.id === productId && i.variant.id === variantId
          ? { ...i, quantity: qty }
          : i
      )
    );
  }

  clear(): void { this._items.set([]); }

  openCart():  void { this._open.set(true); }
  closeCart(): void { this._open.set(false); }
  toggleCart(): void { this._open.update(v => !v); }
}
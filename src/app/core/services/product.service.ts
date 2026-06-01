import { Injectable, signal, computed } from '@angular/core';
import { Product, ProductCategory } from '../models/product.model';

// ── Mock product catalogue ────────────────────────────────────────────────────
// In production this would be replaced by HTTP calls to a Spring Boot API.
// All signals make this reactive throughout the app with zero boilerplate.

const MOCK_PRODUCTS: Product[] = [
  {
    id: 'tee-kerkouane-01',
    slug: 'kerkouane-oversized-tee',
    name: 'Kerkouane Tee',
    category: 'oversized-tee',
    price: 89,
    currency: 'TND',
    images: [
      { url: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&q=80', alt: 'Kerkouane Tee front', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80', alt: 'Kerkouane Tee detail' },
      { url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80', alt: 'Kerkouane Tee worn' },
    ],
    description: 'Named after the ancient Punic city on the Cap Bon peninsula, the Kerkouane Tee embodies the quiet luxury of forgotten civilisations. Cut with a generous silhouette in 280gsm heavyweight cotton.',
    details: ['280gsm 100% ring-spun cotton', 'Oversized boxy fit', 'Dropped shoulders', 'Ribbed collar', 'Screen-printed Punic motif on chest', 'Pre-washed for softness'],
    material: '100% Ring-spun Cotton',
    origin: 'Made in Tunisia',
    variants: [
      { id: 'v1', size: 'XS', stock: 5 },
      { id: 'v2', size: 'S',  stock: 12 },
      { id: 'v3', size: 'M',  stock: 8 },
      { id: 'v4', size: 'L',  stock: 3 },
      { id: 'v5', size: 'XL', stock: 0 },
    ],
    tags: ['new', 'bestseller'],
    rating: 4.8,
    reviewCount: 47,
    isNew: true,
    isFeatured: true,
    relatedIds: ['hoodie-baal-01', 'shirt-tanit-01'],
    reviews: [
      { id: 'r1', author: 'Yasmine B.', rating: 5, date: '2025-03-12', title: 'Worth every dinar', body: 'The weight and drop of this tee is unlike anything I own. The Punic motif is subtle and beautiful.', verified: true },
      { id: 'r2', author: 'Karim L.', rating: 5, date: '2025-02-28', title: 'Finally a local brand with real quality', body: 'I\'ve been waiting for something like this. Washed it three times, holds perfectly.', verified: true },
      { id: 'r3', author: 'Sarra M.', rating: 4, date: '2025-02-10', title: 'Beautiful but runs large', body: 'Stunning piece. I went down a size per the guide and it fit perfectly. Quality is exceptional.', verified: false },
    ],
  },
  {
    id: 'hoodie-baal-01',
    slug: 'baal-hammon-hoodie',
    name: 'Baal Hammon Hood',
    category: 'hoodie',
    price: 190,
    currency: 'TND',
    images: [
      { url: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80', alt: 'Baal Hammon Hood front', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?w=800&q=80', alt: 'Baal Hammon Hood back' },
    ],
    description: 'Channelling the power and gravitas of the chief deity of Carthage. A heavyweight fleece hoodie built for presence — structured silhouette, deep hood, and an embossed solar disc on the chest.',
    details: ['420gsm 80/20 cotton-fleece blend', 'Structured boxy silhouette', 'Deep kangaroo pocket', 'Embossed solar disc motif', 'Brushed interior', 'Reinforced drawcord'],
    material: '80% Cotton / 20% Polyester Fleece',
    origin: 'Made in Tunisia',
    variants: [
      { id: 'v1', size: 'S',  stock: 6 },
      { id: 'v2', size: 'M',  stock: 9 },
      { id: 'v3', size: 'L',  stock: 4 },
      { id: 'v4', size: 'XL', stock: 2 },
    ],
    tags: ['featured'],
    rating: 4.9,
    reviewCount: 31,
    isFeatured: true,
    relatedIds: ['tee-kerkouane-01', 'jacket-carthage-01'],
    reviews: [
      { id: 'r1', author: 'Omar T.', rating: 5, date: '2025-01-20', title: 'The best hoodie I own', body: 'Heavyweight without being stiff. The embossed motif is incredibly refined.', verified: true },
    ],
  },
  {
    id: 'shirt-tanit-01',
    slug: 'tanit-luxury-shirt',
    name: 'Tanit Shirt',
    category: 'shirt',
    price: 145,
    currency: 'TND',
    originalPrice: 180,
    images: [
      { url: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&q=80', alt: 'Tanit Shirt front', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1620799139507-60c4b8a65eca?w=800&q=80', alt: 'Tanit Shirt detail' },
    ],
    description: 'Inspired by the Sign of Tanit — the most revered symbol of ancient Carthage. An oversized woven shirt in Portuguese linen with a subtle jacquard interpretation of the goddess\'s emblem.',
    details: ['100% Portuguese linen', 'Relaxed oversized cut', 'Jacquard Tanit symbol at hem', 'Mother-of-pearl buttons', 'Single chest pocket', 'Garment-washed finish'],
    material: '100% Portuguese Linen',
    origin: 'Made in Tunisia',
    variants: [
      { id: 'v1', size: 'S',  stock: 4 },
      { id: 'v2', size: 'M',  stock: 7 },
      { id: 'v3', size: 'L',  stock: 3 },
      { id: 'v4', size: 'XL', stock: 0 },
    ],
    tags: ['limited', 'sale'],
    rating: 4.7,
    reviewCount: 18,
    isLimited: true,
    isFeatured: true,
    relatedIds: ['tee-kerkouane-01', 'scarf-medina-01'],
    reviews: [
      { id: 'r1', author: 'Ines B.', rating: 5, date: '2025-04-01', title: 'Museum quality', body: 'This shirt is art. The jacquard detail is so refined you have to touch it to believe it.', verified: true },
    ],
  },
  {
    id: 'jacket-carthage-01',
    slug: 'carthage-coach-jacket',
    name: 'Carthage Coach',
    category: 'jacket',
    price: 295,
    currency: 'TND',
    images: [
      { url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80', alt: 'Carthage Coach front', isPrimary: true },
      { url: 'https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=800&q=80', alt: 'Carthage Coach worn' },
    ],
    description: 'A reimagined coach jacket drawing from Roman-African mosaic iconography. Deadstock nylon outer with a silk-feel inner lining printed with a full Carthaginian mosaic map.',
    details: ['Deadstock ripstop nylon outer', 'Printed mosaic map lining', 'Snap-button front closure', 'Elastic cuffs and hem', 'Interior zip pocket', 'Embroidered Carthage crest on chest'],
    material: 'Outer: 100% Nylon / Lining: 100% Viscose',
    origin: 'Made in Tunisia',
    variants: [
      { id: 'v1', size: 'S',  stock: 3 },
      { id: 'v2', size: 'M',  stock: 5 },
      { id: 'v3', size: 'L',  stock: 2 },
      { id: 'v4', size: 'XL', stock: 1 },
    ],
    tags: ['featured', 'new'],
    rating: 5.0,
    reviewCount: 9,
    isNew: true,
    isFeatured: true,
    relatedIds: ['hoodie-baal-01', 'tee-kerkouane-01'],
    reviews: [
      { id: 'r1', author: 'Mehdi K.', rating: 5, date: '2025-05-01', title: 'Conversation starter', body: 'The mosaic lining is phenomenal. Everyone asks about this jacket.', verified: true },
    ],
  },
  {
    id: 'scarf-medina-01',
    slug: 'medina-wrap-scarf',
    name: 'Medina Wrap',
    category: 'scarf',
    price: 75,
    currency: 'TND',
    images: [
      { url: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80', alt: 'Medina Wrap scarf', isPrimary: true },
    ],
    description: 'A generous wrap in undyed Merino wool with hand-knotted fringe and a geometric Berber border woven on a traditional Tunisian loom.',
    details: ['100% Merino wool', 'Hand-knotted fringe ends', 'Woven Berber geometric border', 'Natural undyed fibre', '200cm × 70cm'],
    material: '100% Merino Wool',
    origin: 'Handwoven in Kairouan, Tunisia',
    variants: [
      { id: 'v1', size: 'One Size', stock: 15 },
    ],
    tags: ['accessory'],
    rating: 4.6,
    reviewCount: 23,
    relatedIds: ['tote-mosaic-01', 'shirt-tanit-01'],
    reviews: [],
  },
  {
    id: 'tote-mosaic-01',
    slug: 'mosaic-tote-bag',
    name: 'Mosaic Tote',
    category: 'tote-bag',
    price: 65,
    currency: 'TND',
    images: [
      { url: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80', alt: 'Mosaic Tote front', isPrimary: true },
    ],
    description: 'A structured tote in undyed heavy canvas with a screen-printed Roman mosaic motif from the Bardo National Museum collection. Waxed interior for durability.',
    details: ['14oz undyed canvas', 'Waxed interior', 'Bardo mosaic screen print', 'Leather base reinforcement', 'Interior zip pocket', '40cm × 35cm × 12cm'],
    material: '100% Cotton Canvas',
    origin: 'Made in Tunisia',
    variants: [
      { id: 'v1', size: 'One Size', stock: 20 },
    ],
    tags: ['accessory'],
    rating: 4.5,
    reviewCount: 34,
    relatedIds: ['scarf-medina-01'],
    reviews: [],
  },
  {
    id: 'sweater-byrsa-01',
    slug: 'byrsa-hill-sweater',
    name: 'Byrsa Knit',
    category: 'sweater',
    price: 220,
    currency: 'TND',
    images: [
      { url: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&q=80', alt: 'Byrsa Knit front', isPrimary: true },
    ],
    description: 'Named after the citadel hill of Carthage, this chunky knit sweater interprets ancient Punic masonry patterns through a modern intarsia technique.',
    details: ['100% Tunisian wool', 'Intarsia masonry pattern', 'Relaxed crew neck', 'Ribbed hem and cuffs', 'Hand-finished seams', 'Dry clean only'],
    material: '100% Tunisian Wool',
    origin: 'Knitted in Sfax, Tunisia',
    variants: [
      { id: 'v1', size: 'S',  stock: 4 },
      { id: 'v2', size: 'M',  stock: 6 },
      { id: 'v3', size: 'L',  stock: 3 },
    ],
    tags: ['new'],
    rating: 4.9,
    reviewCount: 12,
    isNew: true,
    relatedIds: ['scarf-medina-01', 'jacket-carthage-01'],
    reviews: [],
  },
];

@Injectable({ providedIn: 'root' })
export class ProductService {
  // ── Private state (signals) ──────────────────────────────────────────────
  private readonly _products = signal<Product[]>(MOCK_PRODUCTS);
  private readonly _loading  = signal(false);
  private readonly _filter   = signal<ProductCategory | 'all'>('all');
  private readonly _search   = signal('');

  // ── Public read API ──────────────────────────────────────────────────────
  readonly products = this._products.asReadonly();
  readonly loading  = this._loading.asReadonly();
  readonly filter   = this._filter.asReadonly();

  readonly filteredProducts = computed(() => {
    const all    = this._products();
    const cat    = this._filter();
    const search = this._search().toLowerCase().trim();

    return all
      .filter(p => cat === 'all' || p.category === cat)
      .filter(p => !search || p.name.toLowerCase().includes(search) || p.tags.includes(search));
  });

  readonly featuredProducts = computed(() =>
    this._products().filter(p => p.isFeatured)
  );

  // ── Queries ──────────────────────────────────────────────────────────────
  getById(id: string): Product | undefined {
    return this._products().find(p => p.id === id);
  }

  getBySlug(slug: string): Product | undefined {
    return this._products().find(p => p.slug === slug);
  }

  getRelated(ids: string[]): Product[] {
    return this._products().filter(p => ids.includes(p.id));
  }

  // ── Mutations ────────────────────────────────────────────────────────────
  setFilter(cat: ProductCategory | 'all'): void {
    this._filter.set(cat);
  }

  setSearch(term: string): void {
    this._search.set(term);
  }
}
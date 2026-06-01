import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
 
@Injectable({ providedIn: 'root' })
export class ScrollService {
  private platformId = inject(PLATFORM_ID);
 
  readonly scrollY   = signal(0);
  readonly scrollDir = signal<'up' | 'down'>('down');
  readonly scrollPct = signal(0);
 
  private lastY = 0;
 
  constructor() {
    if (!isPlatformBrowser(this.platformId)) return;
    window.addEventListener('scroll', this.onScroll.bind(this), { passive: true });
  }
 
  private onScroll(): void {
    const y = window.scrollY;
    this.scrollY.set(y);
    this.scrollDir.set(y > this.lastY ? 'down' : 'up');
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollPct.set(maxScroll > 0 ? y / maxScroll : 0);
    this.lastY = y;
  }
 
  scrollTo(top: number, behavior: ScrollBehavior = 'smooth'): void {
    if (!isPlatformBrowser(this.platformId)) return;
    window.scrollTo({ top, behavior });
  }
 
  scrollToTop(): void { this.scrollTo(0); }
}

import {
  Directive, ElementRef, Output, EventEmitter,
  OnInit, OnDestroy, inject, input
} from '@angular/core';

/**
 * Emits (inView) once when the host element enters the viewport.
 * Uses IntersectionObserver and automatically unobserves after the first trigger.
 *
 * Usage:  <div (inView)="onVisible()" [threshold]="0.2">
 */
@Directive({
  selector: '[inView]',
  standalone: true,
})
export class InViewDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef);

  threshold  = input(0.15);
  rootMargin = input('0px 0px -80px 0px');

  @Output() inView = new EventEmitter<boolean>();

  private observer!: IntersectionObserver;

  ngOnInit(): void {
    if (typeof IntersectionObserver === 'undefined') {
      // SSR fallback — emit immediately
      this.inView.emit(true);
      return;
    }
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.inView.emit(true);
          this.observer.unobserve(this.el.nativeElement);
        }
      },
      { threshold: this.threshold(), rootMargin: this.rootMargin() }
    );
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
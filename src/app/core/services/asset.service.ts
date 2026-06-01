// src/app/core/services/asset.service.ts
import { Injectable, inject } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AssetService {
  private base = inject(APP_BASE_HREF, { optional: true }) ?? '/';

  // Call this for every local asset path
  url(path: string): string {
    const base = this.base.endsWith('/') ? this.base : this.base + '/';
    const clean = path.startsWith('/') ? path.slice(1) : path;
    return `${base}${clean}`;
  }
}
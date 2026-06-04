import { Injectable } from '@angular/core';
import { CLOUDINARY, TRANSFORMS, TransformPreset, cloudinaryUrl } from '../config/cloudinary.config';

export interface ResponsiveImage {
  src:        string;
  srcset:     string;
  blur:       string;   // low-quality placeholder
  alt:        string;
  width:      number;
  height:     number;
}

@Injectable({ providedIn: 'root' })
export class CloudinaryService {

  // ── Core builder ────────────────────────────────────
  url(publicId: string, preset: TransformPreset | string = 'editorial'): string {
    return cloudinaryUrl(publicId, preset);
  }

  // ── Named presets ────────────────────────────────────
  hero(publicId: string):       string { return this.url(publicId, 'hero'); }
  editorial(publicId: string):  string { return this.url(publicId, 'editorial'); }
  collection(publicId: string): string { return this.url(publicId, 'collection'); }
  thumb(publicId: string):      string { return this.url(publicId, 'thumb'); }
  texture(publicId: string):    string { return this.url(publicId, 'texture'); }
  blur(publicId: string):       string { return this.url(publicId, 'blur'); }

  // ── Responsive srcset builder ────────────────────────
  srcset(publicId: string, widths = [400, 800, 1200, 1600]): string {
    return widths
      .map(w => `${CLOUDINARY.baseUrl}/w_${w},q_auto,f_auto,dpr_auto/${publicId} ${w}w`)
      .join(', ');
  }

  // ── Full responsive image object ─────────────────────
  responsive(publicId: string, alt: string, width = 1200, height = 800): ResponsiveImage {
    return {
      src:    this.url(publicId, 'editorial'),
      srcset: this.srcset(publicId),
      blur:   this.blur(publicId),
      alt,
      width,
      height,
    };
  }
}
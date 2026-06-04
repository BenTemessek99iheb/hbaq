import { environment } from '../../../environments/environment';

export const CLOUDINARY = {
  cloudName: environment.cloudinary.cloudName,
  baseUrl: `https://res.cloudinary.com/${environment.cloudinary.cloudName}/image/upload`,
} as const;

// ── Transformation presets ──────────────────────────────
export const TRANSFORMS = {
  hero:       'w_1600,h_900,c_fill,g_auto,q_auto,f_auto,dpr_auto',
  editorial:  'w_1200,h_1600,c_fill,g_auto,q_auto,f_auto,dpr_auto',
  collection: 'w_900,h_1200,c_fill,g_auto,q_auto,f_auto,dpr_auto',
  thumb:      'w_400,h_400,c_fill,g_auto,q_auto,f_auto',
  texture:    'w_600,q_auto,f_auto',
  blur:       'w_40,q_10,f_auto,e_blur:800',   // placeholder blur-up
} as const;

export type TransformPreset = keyof typeof TRANSFORMS;

export function cloudinaryUrl(
  publicId: string,
  preset: TransformPreset | string = 'editorial'
): string {
  const transform = TRANSFORMS[preset as TransformPreset] ?? preset;
  return `${CLOUDINARY.baseUrl}/${transform}/${publicId}`;
}
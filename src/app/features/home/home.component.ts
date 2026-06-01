import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeroComponent } from './sections/hero/hero.component';
import { BrandStatementComponent } from './sections/brand-statement/brand-statement.component';
import { FeaturedProductsComponent } from './sections/featured-products/featured-products.component';
import { FooterComponent } from "../../layout/footer/footer.component";
import { MosaicEditorialComponent } from "./sections/mosaic-editorial/mosaic-editorial.component";
import { HeritageStoryComponent } from "./sections/heritage-story/heritage-story.component";
import { CollectionPreviewComponent } from "./sections/collection-preview/collection-preview.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    BrandStatementComponent,
    
    FooterComponent,
    MosaicEditorialComponent,
    HeritageStoryComponent,
    CollectionPreviewComponent
],
  template: `
    <main class="grain-overlay">
      <app-hero />
      <app-brand-statement />
      <app-mosaic-editorial />
      <app-heritage-story />
      <app-collection-preview />
<!--       <app-featured-products />
 -->      <app-footer />
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
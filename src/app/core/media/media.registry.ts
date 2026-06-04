// All Cloudinary public IDs in one place.
// Never scatter string paths across components.

export const MEDIA = {

  hero: {
    main: 'hero-main_x7k2mn',
  },

  editorial: {
    mosaicPrimary: 'mosaic-primary_rn1oiv',
    mosaicDetail: 'mosaic-detail_rygpyg',
    mosaicCoastal: 'mosaic-coastal_efncmw',
  },

  collection: {
    narrativePanelShirt:     'narrative-panel-shirt_d236zz',
    tunisianJapaneseKimono:  'tunisian-japanese-kimono_oraarw',
    longlineDusterAbaya:     'longline-duster-abaya_fpal7t',
    cubanoCampShirt:         'cubano-camp-shirt_kqqqy0',
    splitNeckTunic:          'split-neck-tunic_lqo8eo',
    artisanDroppedShoulder:  'artisan-dropped-shoulder_zdfxpj',
  },

  textures: {
    grain:   'grain',
    mosaic:  'mosaic-pattern',
    stone:   'stone',
    linen:   'linen',
  },

} as const;
import { CommonModule } from '@angular/common';
import { Component, HostListener, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ContrastLevel, M3ThemeService } from './services/m3-theme.service';

export type ProductCategory = 'all' | 'headphones' | 'speakers' | 'synthesizers' | 'lighting';

export interface ProductFinish {
  name: string;
  hex: string;
  seedHex: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  category: Exclude<ProductCategory, 'all'>;
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  badge?: string;
  badgeType?: 'new' | 'bestseller' | 'limited';
  image: string;
  finishes: ProductFinish[];
  highlights: string[];
  description: string;
  dimensions: string;
  materials: string;
  specs: ProductSpec[];
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  finish: ProductFinish;
  quantity: number;
  engraving?: string;
  carePlus: boolean;
}

export interface LookbookSlide {
  id: string;
  indexLabel: string;
  title: string;
  subtitle: string;
  architecturalSpace: string;
  image: string;
  featuredProductId: string;
  seedHex: string;
  acousticNote: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatBadgeModule,
    MatMenuModule,
    MatDividerModule,
    MatSnackBarModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly Math = Math;
  readonly theme = inject(M3ThemeService);
  private readonly snackBar = inject(MatSnackBar);

  // Scroll & Navigation Shell State
  readonly isScrolled = signal<boolean>(false);
  readonly activeSection = signal<'hero' | 'lookbook' | 'catalog' | 'acoustic-lab' | 'atelier-story'>('hero');
  readonly themeDrawerOpen = signal<boolean>(false);
  readonly searchModalOpen = signal<boolean>(false);
  readonly searchQuery = signal<string>('');

  // Hero Interactive Hotspot State
  readonly activeHeroHotspot = signal<number>(0);
  readonly heroHotspots = [
    {
      id: 0,
      title: '80mm Planar Magnetic Ribbon Driver',
      detail: 'Ultra-low 0.02% total harmonic distortion across 10Hz – 48kHz reference bandwidth.',
      x: '28%',
      y: '36%',
    },
    {
      id: 1,
      title: 'CNC-Milled Anodized Terracotta Chassis',
      detail: 'Bead-blasted 6061 aerospace aluminum with knurled champagne-brass rotary crown.',
      x: '68%',
      y: '48%',
    },
    {
      id: 2,
      title: 'Honed Roman Travertine Acoustic Plinth',
      detail: 'High-mass stone base eliminates cabinet resonance and anchors spatial dispersion.',
      x: '48%',
      y: '78%',
    },
  ];

  // Lookbook Multi-Browse Squishing Carousel
  readonly activeLookbookIdx = signal<number>(0);
  readonly lookbookSlides: LookbookSlide[] = [
    {
      id: 'slide-1',
      indexLabel: '01 / PERSONAL REFERENCE',
      title: 'Sona One Planar',
      subtitle: 'Tactile solitude in anodized terracotta & espresso lambskin',
      architecturalSpace: 'Copenhagen Listening Loft',
      image: '/images/prod-headphones-terracotta.png',
      featuredProductId: 'sona-one',
      seedHex: '#9C4131',
      acousticNote: 'Open/Closed hybrid acoustic vents · 48h battery',
    },
    {
      id: 'slide-2',
      indexLabel: '02 / SPATIAL ROOM SCULPTURE',
      title: 'Sona Monolith 360°',
      subtitle: 'Omnidirectional room-filling sound wrapped in Kvadrat wool bouclé',
      architecturalSpace: 'Kyoto Concrete Pavilion',
      image: '/images/prod-speaker-monolith.png',
      featuredProductId: 'sona-monolith',
      seedHex: '#7A5900',
      acousticNote: '6-driver spatial array · Room-calibration sonar',
    },
    {
      id: 'slide-3',
      indexLabel: '03 / TACTILE SOUND DESIGN',
      title: 'Sona Field OP Synth',
      subtitle: 'CNC-machined portable workstation, 32-bit DAC & 4-track tape engine',
      architecturalSpace: 'Zurich Industrial Studio',
      image: '/images/prod-synth-field.png',
      featuredProductId: 'sona-field-op',
      seedHex: '#006874',
      acousticNote: 'Color-coded optical encoders · 24h field battery',
    },
    {
      id: 'slide-4',
      indexLabel: '04 / AMBIENT LIGHT & SOUND',
      title: 'Sona Halo Luminaire',
      subtitle: 'Hand-blown frosted alabaster glass orb with 360° warm acoustic waveguide',
      architecturalSpace: 'Milan Editorial Library',
      image: '/images/prod-luminaire-halo.png',
      featuredProductId: 'sona-halo',
      seedHex: '#9C4131',
      acousticNote: '2200K–3000K circadian dimmer · Near-field coaxial driver',
    },
    {
      id: 'slide-5',
      indexLabel: '05 / ANALOG PRECISION',
      title: 'Sona Sol Turntable',
      subtitle: 'Solid honed travertine stone plinth with optical speed-locked direct drive',
      architecturalSpace: 'Stockholm Vinyl Archive',
      image: '/images/prod-turntable-sol.png',
      featuredProductId: 'sona-sol',
      seedHex: '#2E6C36',
      acousticNote: 'Carbon-boron tonearm · Built-in Class-A phono stage',
    },
  ];

  // Complete Flagship Product Catalog (6 Products with AI Photography)
  readonly products: Product[] = [
    {
      id: 'sona-one',
      name: 'Sona One',
      subtitle: 'Reference Planar Magnetic Wireless Headphones',
      tagline: 'Zero-resonance CNC aluminum earcups with tactile brass rotary crown.',
      category: 'headphones',
      categoryLabel: 'Headphones',
      price: 690,
      originalPrice: 750,
      rating: 4.96,
      reviewsCount: 418,
      badge: 'Flagship Bestseller',
      badgeType: 'bestseller',
      image: '/images/prod-headphones-terracotta.png',
      finishes: [
        { name: 'Terracotta Clay', hex: '#9C4131', seedHex: '#9C4131' },
        { name: 'Celadon Sage', hex: '#4A7C59', seedHex: '#2E6C36' },
        { name: 'Champagne Brass', hex: '#C5A059', seedHex: '#7A5900' },
        { name: 'Obsidian Matte', hex: '#2B2930', seedHex: '#6442D6' },
      ],
      highlights: ['80mm Planar Ribbon', '48h Lossless Battery', 'Active Spatial ANC'],
      description:
        'Engineered for mastering engineers and architectural minimalists alike, Sona One pairs custom 80mm ultra-thin planar magnetic transducers with a CNC-milled anodized aluminum yoke and replaceable lambskin memory-foam cushions.',
      dimensions: '198 × 165 × 84 mm · 345 g',
      materials: 'Anodized 6061 Aluminum, Knurled Brass, Full-Grain Lambskin, Sapphire Glass',
      specs: [
        { label: 'Transducer', value: '80mm Custom Planar Magnetic with Neodymium N55 Array' },
        { label: 'Frequency Response', value: '8 Hz – 50,000 Hz (0.02% THD @ 1kHz)' },
        { label: 'Connectivity', value: 'Bluetooth 5.4 (aptX Lossless, LDAC), USB-C 32-bit/384kHz DAC, 3.5mm Balanced' },
        { label: 'Battery Autonomy', value: '48 hours with Adaptive ANC · 10-min fast charge = 9 hours' },
      ],
      inStock: true,
    },
    {
      id: 'sona-monolith',
      name: 'Sona Monolith',
      subtitle: '360° Spatial Acoustic Room Sculpture',
      tagline: 'Omnidirectional 6-driver acoustic column with ambient base illumination.',
      category: 'speakers',
      categoryLabel: 'Speakers',
      price: 1290,
      rating: 4.98,
      reviewsCount: 289,
      badge: 'Architectural Icon',
      badgeType: 'new',
      image: '/images/prod-speaker-monolith.png',
      finishes: [
        { name: 'Sand Bouclé & Champagne', hex: '#D6C6B2', seedHex: '#7A5900' },
        { name: 'Terracotta Bronze', hex: '#9C4131', seedHex: '#9C4131' },
        { name: 'Nordic Sage Wool', hex: '#5D7A68', seedHex: '#2E6C36' },
      ],
      highlights: ['420W Class-D Array', 'Sonar Room Tuning', 'AirPlay 2 & Cast'],
      description:
        'Sona Monolith projects a holographic 360-degree soundstage that adapts automatically to your room geometry using built-in acoustic sonar. Wrapped in custom Kvadrat acoustic wool bouclé over a damped aluminum core.',
      dimensions: 'Ø 210 × 380 mm · 6.8 kg',
      materials: 'Brushed Champagne Aluminum, Kvadrat Acoustic Bouclé, Honed Travertine Base Ring',
      specs: [
        { label: 'Acoustic Architecture', value: '1× 6.5" Down-firing Woofer, 3× 3" Mid-range, 2× Planar Tweeters' },
        { label: 'Amplification', value: '6× Dedicated Class-D Amplifiers (420W Peak Total)' },
        { label: 'Max Sound Pressure', value: '104 dB SPL @ 1m · Deep Bass Extension to 26 Hz' },
        { label: 'Smart Integration', value: 'Wi-Fi 6E, AirPlay 2, Google Cast, Spotify/Tidal Connect, HDMI eARC' },
      ],
      inStock: true,
    },
    {
      id: 'sona-field-op',
      name: 'Sona Field OP',
      subtitle: 'Portable Tactile Synthesizer, Sampler & 32-Bit DAC',
      tagline: 'Precision CNC unibody workstation with color-coded optical rotary encoders.',
      category: 'synthesizers',
      categoryLabel: 'Synthesizers',
      price: 890,
      rating: 4.94,
      reviewsCount: 194,
      badge: 'Atelier Limited',
      badgeType: 'limited',
      image: '/images/prod-synth-field.png',
      finishes: [
        { name: 'Anodized Field Silver', hex: '#C8CCD0', seedHex: '#006874' },
        { name: 'Cobalt Lab Edition', hex: '#2856A3', seedHex: '#005AC1' },
        { name: 'Terracotta Studio', hex: '#9C4131', seedHex: '#9C4131' },
      ],
      highlights: ['12 Synth Engines', '32-Bit/768kHz USB DAC', 'High-Contrast OLED'],
      description:
        'Machined from a solid billet of bead-blasted aluminum, Sona Field OP combines 12 physical-modeling and FM synthesizer engines, a 4-track stereo tape looper, and a reference-grade balanced headphone DAC.',
      dimensions: '288 × 104 × 18 mm · 590 g',
      materials: 'CNC Billet Aluminum, Anodized Color Encoders, Flush Gorilla Glass OLED',
      specs: [
        { label: 'Synthesis & Sampling', value: '12 Polyphonic Engines, 16-bit/96kHz Stereo Sampler, 4-Track Tape' },
        { label: 'Rotary Encoders', value: '4× High-Resolution Optical Detent Encoders (Terracotta/Sage/Cobalt/Ochre)' },
        { label: 'Audio I/O', value: '4.4mm Balanced Out, 3.5mm Line/Mic In, Dual Stereo MEMS Microphones, USB-C' },
        { label: 'Battery & Storage', value: '24-hour rechargeable Li-Ion · 64 GB internal flash memory' },
      ],
      inStock: true,
    },
    {
      id: 'sona-halo',
      name: 'Sona Halo',
      subtitle: 'Sculptural Alabaster Luminaire & Ambient Sound Diffuser',
      tagline: 'Warm 2200K sunset glow paired with a 360° near-field coaxial speaker.',
      category: 'lighting',
      categoryLabel: 'Lighting',
      price: 540,
      rating: 4.91,
      reviewsCount: 162,
      badge: 'New Release',
      badgeType: 'new',
      image: '/images/prod-luminaire-halo.png',
      finishes: [
        { name: 'Warm Bronze & Alabaster', hex: '#8A5A44', seedHex: '#9C4131' },
        { name: 'Brushed Brass & Opal', hex: '#B89758', seedHex: '#7A5900' },
      ],
      highlights: ['Circadian 2200K–3000K', '360° Coaxial Audio', 'Touch Ring Dimmer'],
      description:
        'Designed for bedside sanctuaries and executive desks, Sona Halo suspends a hand-turned Spanish alabaster sphere above a concealed upward-firing coaxial acoustic waveguide. Glide your finger along the bronze ring to dim light and volume in unison.',
      dimensions: 'Ø 220 × 265 mm · 3.4 kg',
      materials: 'Spanish Alabaster Stone Glass, Brushed Architectural Bronze, Merino Acoustic Felt',
      specs: [
        { label: 'Illumination', value: 'CRI 97+ Warm LED Array (1800K Candlelight to 3000K Warm Gallery)' },
        { label: 'Acoustic Driver', value: '90mm Full-Range Paper-Cone Coaxial Driver + Passive Radiator (65W)' },
        { label: 'Soundscapes', value: '14 Built-in Generative Ambient & Sleep Soundscapes + Wireless Streaming' },
        { label: 'Control', value: 'Capacitive 360° Bronze Ring Slider + Sona Atelier App' },
      ],
      inStock: true,
    },
    {
      id: 'sona-pebble-pro',
      name: 'Sona Pebble Pro',
      subtitle: 'Glazed Ceramic True Wireless Reference Earbuds',
      tagline: 'Hand-finished celadon ceramic river-stone case with hybrid planar drivers.',
      category: 'headphones',
      categoryLabel: 'Headphones',
      price: 320,
      originalPrice: 360,
      rating: 4.93,
      reviewsCount: 512,
      badge: 'Pocket Craft',
      badgeType: 'bestseller',
      image: '/images/prod-earbuds-pebble.png',
      finishes: [
        { name: 'Celadon Sage Ceramic', hex: '#6B8E78', seedHex: '#2E6C36' },
        { name: 'Terracotta Kiln Glaze', hex: '#9C4131', seedHex: '#9C4131' },
        { name: 'Raw Travertine Cream', hex: '#E2D9C8', seedHex: '#7A5900' },
      ],
      highlights: ['Zirconia Ceramic Case', '11mm Planar + BA', '42dB Adaptive ANC'],
      description:
        'Each Sona Pebble Pro charging case is sintered from high-density zirconia ceramic and tumbled to feel like a smooth river stone in your palm. Inside, grade-5 titanium acoustic chambers house a dual hybrid planar + balanced armature driver system.',
      dimensions: 'Case: 62 × 48 × 24 mm · 58 g',
      materials: 'Sintered Matte Ceramic, Grade-5 Brushed Titanium, Copper Acoustic Mesh',
      specs: [
        { label: 'Dual Driver System', value: '11mm Dynamic Woofer + 6mm Micro-Planar Tweeter per earbud' },
        { label: 'Noise Cancellation', value: '6-Mic Hybrid Adaptive ANC (up to -42 dB) + Natural Transparency Mode' },
        { label: 'Battery Life', value: '10 hours earbuds + 30 hours in Qi2 wireless ceramic charging case' },
        { label: 'Ingress Protection', value: 'IP55 Dust & Water Resistant (Earbuds)' },
      ],
      inStock: true,
    },
    {
      id: 'sona-sol',
      name: 'Sona Sol',
      subtitle: 'Direct-Drive Honed Travertine Reference Turntable',
      tagline: 'Solid Italian travertine plinth with optical speed-locked platter and Class-A preamp.',
      category: 'synthesizers',
      categoryLabel: 'Synthesizers',
      price: 1650,
      rating: 4.99,
      reviewsCount: 87,
      badge: 'Masterpiece Series',
      badgeType: 'limited',
      image: '/images/prod-turntable-sol.png',
      finishes: [
        { name: 'Roman Travertine & Champagne', hex: '#D8CBB8', seedHex: '#7A5900' },
        { name: 'Rosso Levanto & Bronze', hex: '#8A3B2E', seedHex: '#9C4131' },
      ],
      highlights: ['Solid Travertine Plinth', 'Optical Direct Drive', 'Balanced XLR & Wireless'],
      description:
        'Carved from a single 11-kilogram slab of honed Roman travertine, Sona Sol pairs timeless architectural stone with a coreless brushless direct-drive motor, carbon-boron tonearm, and switchable discrete Class-A phono stage with aptX Lossless streaming.',
      dimensions: '435 × 350 × 125 mm · 14.2 kg',
      materials: 'Honed Roman Travertine Stone, 3.2kg Machined Aluminum Platter, Carbon-Boron Tonearm',
      specs: [
        { label: 'Drive System', value: 'Coreless Brushless Direct Drive with Optical Laser Speed Lock (0.04% Wow/Flutter)' },
        { label: 'Cartridge Included', value: 'Sona MC-1 Moving Coil Cartridge (Nude Shibata Diamond Stylus)' },
        { label: 'Outputs', value: 'Balanced XLR, Gold RCA (Phono/Line), USB-C 24-bit/192kHz Archival, aptX Lossless' },
        { label: 'Speeds', value: '33 1/3, 45, and 78 RPM with warm backlit stroboscopic halo ring' },
      ],
      inStock: true,
    },
  ];

  // Catalog Filtering & Sorting State
  readonly selectedCategory = signal<ProductCategory>('all');
  readonly selectedSort = signal<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  readonly catalogColumns = signal<2 | 3>(3);
  readonly selectedFinishByProduct = signal<Record<string, ProductFinish>>({
    'sona-one': this.products[0].finishes[0],
    'sona-monolith': this.products[1].finishes[0],
    'sona-field-op': this.products[2].finishes[0],
    'sona-halo': this.products[3].finishes[0],
    'sona-pebble-pro': this.products[4].finishes[0],
    'sona-sol': this.products[5].finishes[0],
  });
  readonly dynamicThemeOnProductClick = signal<boolean>(true);

  readonly categories: { id: ProductCategory; label: string; icon: string; count: number }[] = [
    { id: 'all', label: 'All Objects', icon: 'apps', count: 6 },
    { id: 'headphones', label: 'Headphones & Earbuds', icon: 'headphones', count: 2 },
    { id: 'speakers', label: 'Spatial Speakers', icon: 'speaker', count: 1 },
    { id: 'synthesizers', label: 'Synthesizers & Turntables', icon: 'piano', count: 2 },
    { id: 'lighting', label: 'Acoustic Lighting', icon: 'light', count: 1 },
  ];

  readonly filteredProducts = computed(() => {
    const cat = this.selectedCategory();
    const sort = this.selectedSort();
    const q = this.searchQuery().trim().toLowerCase();

    let list = this.products.filter((p) => {
      const matchesCat = cat === 'all' || p.category === cat;
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.materials.toLowerCase().includes(q) ||
        p.highlights.some((h) => h.toLowerCase().includes(q));
      return matchesCat && matchesQuery;
    });

    if (sort === 'price-asc') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      list = [...list].sort((a, b) => b.rating - a.rating);
    }
    return list;
  });

  // Acoustic Lab Interactive DSP Sliders (M3 Expressive 5-Size Sliders)
  readonly activeDspPreset = signal<'warm-vinyl' | 'studio-flat' | 'spatial-cinema' | 'late-night'>('warm-vinyl');
  readonly dspProfile = signal({
    subBass: 72, // XS 16dp
    warmMid: 64, // S 24dp
    vocalPresence: 78, // M 40dp
    ribbonAir: 85, // L 56dp
    spatialStage: 92, // XL 96dp
  });

  // Bespoke Bundle Builder State
  readonly bundleSelection = signal<Record<string, boolean>>({
    'sona-one': true,
    'sona-monolith': true,
    'sona-field-op': false,
    'sona-halo': false,
  });

  readonly bundleSummary = computed(() => {
    const sel = this.bundleSelection();
    const chosen = this.products.filter((p) => sel[p.id]);
    const rawTotal = chosen.reduce((sum, p) => sum + p.price, 0);
    const discountRate = chosen.length >= 3 ? 0.15 : chosen.length >= 2 ? 0.12 : 0;
    const discountAmount = Math.round(rawTotal * discountRate);
    return {
      items: chosen,
      rawTotal,
      discountRate: Math.round(discountRate * 100),
      discountAmount,
      finalTotal: rawTotal - discountAmount,
    };
  });

  // Wishlist & Recently Added Toggle Morph State
  readonly wishlistIds = signal<Set<string>>(new Set(['sona-one', 'sona-field-op']));
  readonly recentlyAddedIds = signal<Record<string, boolean>>({});

  // Product Detail & Configurator Modal State
  readonly activeProductModal = signal<Product | null>(null);
  readonly modalFinish = signal<ProductFinish | null>(null);
  readonly modalEngraving = signal<string>('');
  readonly modalCarePlus = signal<boolean>(false);

  // Shopping Bag Side Sheet & Multi-Step Checkout State
  readonly cartOpen = signal<boolean>(false);
  readonly checkoutStep = signal<'bag' | 'shipping' | 'processing' | 'confirmed'>('bag');
  readonly loadingPolygonStep = signal<number>(0);

  readonly cartItems = signal<CartItem[]>([
    {
      product: this.products[0],
      finish: this.products[0].finishes[0],
      quantity: 1,
      engraving: 'ATELIER 01',
      carePlus: true,
    },
    {
      product: this.products[4],
      finish: this.products[4].finishes[0],
      quantity: 1,
      carePlus: false,
    },
  ]);

  readonly promoCodeInput = signal<string>('');
  readonly appliedPromo = signal<{ code: string; discountPercent: number } | null>(null);
  readonly promoError = signal<string>('');

  // Shipping & Checkout Form (100% Outlined M3 Text Fields — never mixing Filled & Outlined)
  readonly shippingMethod = signal<'express' | 'atelier-white-glove' | 'pickup'>('express');
  readonly checkoutForm = signal({
    fullName: 'Leon Horvat',
    email: 'leon@sona-atelier.io',
    city: 'Zagreb',
    address: 'Ilica 42, Design District',
    postalCode: '10000',
    country: 'Croatia (EU)',
    notes: 'Leave with studio concierge if unavailable.',
  });
  readonly checkoutError = signal<string>('');
  readonly confirmedOrderId = signal<string>('SN-2026-8841');

  readonly cartCount = computed(() =>
    this.cartItems().reduce((acc, item) => acc + item.quantity, 0)
  );

  readonly cartSubtotal = computed(() =>
    this.cartItems().reduce(
      (acc, item) => acc + (item.product.price + (item.carePlus ? 59 : 0)) * item.quantity,
      0
    )
  );

  readonly freeShippingProgress = computed(() =>
    Math.min(100, Math.round((this.cartSubtotal() / 500) * 100))
  );

  readonly shippingCost = computed(() => {
    if (this.shippingMethod() === 'atelier-white-glove') return 45;
    if (this.shippingMethod() === 'pickup') return 0;
    return this.cartSubtotal() >= 500 ? 0 : 25;
  });

  readonly promoDiscountAmount = computed(() => {
    const promo = this.appliedPromo();
    if (!promo) return 0;
    return Math.round((this.cartSubtotal() * promo.discountPercent) / 100);
  });

  readonly cartGrandTotal = computed(() =>
    Math.max(0, this.cartSubtotal() - this.promoDiscountAmount() + this.shippingCost())
  );

  constructor() {
    if (typeof window !== 'undefined') {
      setInterval(() => {
        this.loadingPolygonStep.update((i) => (i + 1) % 7);
      }, 550);
    }
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (typeof window !== 'undefined') {
      this.isScrolled.set(window.scrollY > 24);
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      this.searchModalOpen.update((v) => !v);
    } else if (event.key === 'Escape') {
      this.searchModalOpen.set(false);
      this.activeProductModal.set(null);
      this.cartOpen.set(false);
      this.themeDrawerOpen.set(false);
    }
  }

  scrollToSection(sectionId: 'hero' | 'lookbook' | 'catalog' | 'acoustic-lab' | 'atelier-story'): void {
    this.activeSection.set(sectionId);
    if (typeof document !== 'undefined') {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  selectProductFinish(product: Product, finish: ProductFinish, event?: Event): void {
    event?.stopPropagation();
    this.selectedFinishByProduct.update((map) => ({ ...map, [product.id]: finish }));
    if (this.dynamicThemeOnProductClick()) {
      this.theme.seedColor.set(finish.seedHex);
      this.notify(`Dynamic HCT Theme synced to ${finish.name} (${finish.seedHex})`);
    }
  }

  getSelectedFinish(product: Product): ProductFinish {
    return this.selectedFinishByProduct()[product.id] || product.finishes[0];
  }

  toggleWishlist(product: Product, event?: Event): void {
    event?.stopPropagation();
    const next = new Set(this.wishlistIds());
    if (next.has(product.id)) {
      next.delete(product.id);
      this.notify(`Removed ${product.name} from saved objects`);
    } else {
      next.add(product.id);
      this.notify(`Saved ${product.name} to Atelier Wishlist`);
    }
    this.wishlistIds.set(next);
  }

  isWishlisted(productId: string): boolean {
    return this.wishlistIds().has(productId);
  }

  openProductConfigurator(product: Product): void {
    this.activeProductModal.set(product);
    this.modalFinish.set(this.getSelectedFinish(product));
    this.modalEngraving.set('');
    this.modalCarePlus.set(false);
  }

  addToBag(
    product: Product,
    finish = this.getSelectedFinish(product),
    engraving = '',
    carePlus = false
  ): void {
    const cleanEngraving = engraving.trim().toUpperCase();
    this.cartItems.update((items) => {
      const existingIdx = items.findIndex(
        (i) =>
          i.product.id === product.id &&
          i.finish.name === finish.name &&
          (i.engraving || '') === cleanEngraving &&
          i.carePlus === carePlus
      );
      if (existingIdx > -1) {
        return items.map((item, idx) =>
          idx === existingIdx ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...items,
        {
          product,
          finish,
          quantity: 1,
          engraving: cleanEngraving || undefined,
          carePlus,
        },
      ];
    });

    this.recentlyAddedIds.update((m) => ({ ...m, [product.id]: true }));
    setTimeout(() => {
      this.recentlyAddedIds.update((m) => ({ ...m, [product.id]: false }));
    }, 1600);

    this.notify(`Added ${product.name} (${finish.name}) to Shopping Bag`, 'View Bag');
  }

  saveModalConfigurationToBag(): void {
    const prod = this.activeProductModal();
    if (!prod) return;
    const fin = this.modalFinish() || prod.finishes[0];
    this.addToBag(prod, fin, this.modalEngraving(), this.modalCarePlus());
    this.activeProductModal.set(null);
    this.cartOpen.set(true);
    this.checkoutStep.set('bag');
  }

  updateCartQuantity(index: number, delta: number): void {
    this.cartItems.update((items) =>
      items
        .map((item, idx) => (idx === index ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0)
    );
  }

  removeCartItem(index: number): void {
    this.cartItems.update((items) => items.filter((_, idx) => idx !== index));
  }

  applyPromoCode(): void {
    const code = this.promoCodeInput().trim().toUpperCase();
    if (!code) {
      this.promoError.set('Enter a valid Atelier promo code (try SONA10 or ATELIER20)');
      return;
    }
    if (code === 'SONA10') {
      this.appliedPromo.set({ code: 'SONA10', discountPercent: 10 });
      this.promoError.set('');
      this.notify('Applied 10% Atelier Welcome Privilege (SONA10)');
    } else if (code === 'ATELIER20') {
      this.appliedPromo.set({ code: 'ATELIER20', discountPercent: 20 });
      this.promoError.set('');
      this.notify('Applied 20% VIP Collector Privilege (ATELIER20)');
    } else {
      this.promoError.set('Unrecognized code. Try SONA10 (10% off) or ATELIER20 (20% off).');
    }
  }

  toggleBundleProduct(productId: string): void {
    this.bundleSelection.update((s) => ({ ...s, [productId]: !s[productId] }));
  }

  addBundleToBag(): void {
    const { items } = this.bundleSummary();
    if (items.length === 0) return;
    for (const p of items) {
      this.addToBag(p, this.getSelectedFinish(p));
    }
    this.appliedPromo.set({ code: 'BUNDLE12', discountPercent: 12 });
    this.cartOpen.set(true);
    this.checkoutStep.set('bag');
  }

  applyDspPreset(preset: 'warm-vinyl' | 'studio-flat' | 'spatial-cinema' | 'late-night'): void {
    this.activeDspPreset.set(preset);
    const map = {
      'warm-vinyl': { subBass: 76, warmMid: 70, vocalPresence: 82, ribbonAir: 68, spatialStage: 84 },
      'studio-flat': { subBass: 50, warmMid: 50, vocalPresence: 52, ribbonAir: 50, spatialStage: 60 },
      'spatial-cinema': { subBass: 88, warmMid: 62, vocalPresence: 78, ribbonAir: 90, spatialStage: 96 },
      'late-night': { subBass: 38, warmMid: 68, vocalPresence: 86, ribbonAir: 60, spatialStage: 74 },
    };
    this.dspProfile.set(map[preset]);
  }

  updateDspBand(band: keyof ReturnType<typeof this.dspProfile>, value: number): void {
    this.dspProfile.update((cur) => ({ ...cur, [band]: Number(value) }));
  }

  updateCheckoutField(
    field: keyof ReturnType<typeof this.checkoutForm>,
    value: string
  ): void {
    this.checkoutForm.update((f) => ({ ...f, [field]: value }));
  }

  submitOrder(): void {
    const f = this.checkoutForm();
    if (!f.fullName.trim() || !f.email.trim() || !f.address.trim() || !f.city.trim()) {
      this.checkoutError.set('Please complete all required shipping fields before placing your order.');
      return;
    }
    this.checkoutError.set('');
    this.checkoutStep.set('processing');
    setTimeout(() => {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      this.confirmedOrderId.set(`SN-2026-${randomNum}`);
      this.checkoutStep.set('confirmed');
      this.notify(`Order ${this.confirmedOrderId()} confirmed! Welcome to Sona Atelier.`);
    }, 1800);
  }

  resetOrderFlow(): void {
    this.cartItems.set([]);
    this.checkoutStep.set('bag');
    this.cartOpen.set(false);
  }

  stepLookbook(delta: number): void {
    const len = this.lookbookSlides.length;
    this.activeLookbookIdx.update((i) => (i + delta + len) % len);
    const activeSlide = this.lookbookSlides[this.activeLookbookIdx()];
    if (this.dynamicThemeOnProductClick()) {
      this.theme.seedColor.set(activeSlide.seedHex);
    }
  }

  selectLookbookSlide(idx: number): void {
    this.activeLookbookIdx.set(idx);
    const slide = this.lookbookSlides[idx];
    if (this.dynamicThemeOnProductClick()) {
      this.theme.seedColor.set(slide.seedHex);
    }
  }

  setContrast(level: ContrastLevel): void {
    this.theme.contrastLevel.set(level);
  }

  notify(message: string, action = 'Dismiss'): void {
    const ref = this.snackBar.open(message, action, {
      duration: 3600,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
    if (action === 'View Bag') {
      ref.onAction().subscribe(() => {
        this.cartOpen.set(true);
        this.checkoutStep.set('bag');
      });
    }
  }
}

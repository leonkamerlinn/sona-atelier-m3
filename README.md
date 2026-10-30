# SONA ATELIER — Flagship Brand E-Commerce (Angular 21 + Material Design 3 Expressive)

Production-ready flagship industrial audio & architectural objects e-commerce storefront engineered with **Angular 21**, **Angular Material 21**, real-time **HCT (`@material/material-color-utilities`) Dynamic Color**, and our comprehensive **Material Design 3 Expressive Skill** (`material-design-skill/`).

## Highlights

- **Content-Based Dynamic Color (HCT)**: Selecting any hardware finish (`Terracotta Clay #9C4131`, `Celadon Sage #2E6C36`, `Champagne Brass #7A5900`, `Glacial Cobalt #005AC1`) dynamically recomputes all 6 × 24 tonal palettes and 40+ `--md-sys-color-*` & `--mat-sys-*` tokens in real time with guaranteed WCAG contrast ($\Delta T \ge 50$).
- **M3 Expressive Component Architecture**:
  - **Sticky Top App Bar (`64dp`)** transitioning from flat `surface` (`level0`) to `surface-container` (`level2`) on scroll.
  - **2-Column Split Flagship Hero** with concentric optical corner nesting ($R_{\text{inner}} = R_{\text{outer}} - P = 32\text{dp} - 12\text{dp} = 20\text{dp}$) and interactive hotspot pins.
  - **Multi-Browse Squishing Lookbook Carousel (`28dp` radius, `8dp` gap)** powered by `--md-sys-motion-spring-default-spatial`.
  - **M3 Expressive 5-Size Sliders (`XS 16dp` to `XL 96dp` tracks)** with `4dp` vertical handle and `4dp` stop dot in the Interactive Acoustic DSP Lab.
  - **M3 Expressive Segmented Lists (`2dp` gap, `16dp` outer / `4dp` inner corner morph)** in the Bespoke Bundle Builder and Checkout delivery selector.
  - **Modal Shopping Bag Side Sheet (`surface-container-low`, `28dp` corners)** with **Wavy Linear Progress Indicator**, `Outlined` M3 text fields, and **7-Shape Morphing Loading Indicator**.
  - **Floating Pill Toolbar (`64dp`) + Paired `56dp` Bag FAB** (`8dp` separation).
- **AI-Generated Commercial Studio Photography (`public/images/`)**: 8 custom 8K-style industrial design product and atelier lookbook photographs.

## Local Development

```bash
npm install
npm start
# Open http://localhost:4200
```

## Google Cloud Run Deployment

```bash
gcloud run deploy sona-atelier \
  --source . \
  --project project-57147346-010b-465c-a23 \
  --region europe-west1 \
  --allow-unauthenticated
```

# PcHub

<img alt="PcHub" src="public/images/nav/logo.webp" width="120" />

PcHub | Angular storefront for PC components, pre-built PCs, and deals.

Built with **Angular 22**, **TypeScript**, and **Signals**.

## Live demo

Deployed on GitHub Pages: https://1m7md-cs.github.io/pc-hub/

## Features

- Browse PC components, pre-built PCs, and monthly deals
- Per-user accounts (sign in / sign up)
- Per-user carts
- Editable item quantities and live totals
- Order your cart directly via WhatsApp
- Authenticated cart & sign-in guards
- Reactive forms with validation
- Dynamic page titles & Open Graph metadata
- Responsive UI with CSS theme variables

## Tech stack

- Angular 22 (Signals, standalone components, control flow)
- TypeScript, CSS
- Angular Router (guards, lazy loading)

## Getting started

```bash
npm install
npm start          # dev server at http://localhost:4200
```

## Project structure

```
src/
├── app/
│   ├── home/                     # landing page
│   │   ├── navbar/               # nav + user menu + cart badge
│   │   ├── hero/                 # hero section
│   │   ├── shop-by-category/     # category grid
│   │   ├── featured-products/    # featured products
│   │   ├── product-of-the-month/ # product of the month
│   │   ├── promo-banner/         # promo banner
│   │   ├── why-choose-us/        # why choose us
│   │   ├── testimonials/         # testimonials
│   │   └── footer/               # footer
│   ├── cart/                     # cart page (qty, totals, WhatsApp order)
│   ├── category-products/        # products by category
│   ├── contacts/                 # contacts page
│   ├── auth-page/                # sign in / sign up
│   ├── page/                     # static content pages (FAQ, about, etc.)
│   ├── not-found/                # 404 page
│   ├── shared/
│   │   ├── ui/                   # reusable components
│   │   │   ├── icon/
│   │   │   ├── product-card/
│   │   │   ├── product-skeleton/
│   │   │   ├── section-header/
│   │   │   ├── skeleton/
│   │   │   └── state-card/
│   │   └── async-state.ts        # async load-state helper
│   ├── models/                   # typed models (product, user, page, ...)
│   ├── services/                 # auth, cart, products, title-strategy
│   ├── guards/                   # route guards
│   ├── app.routes.ts             # routing config
│   ├── app.config.ts             # providers / config
│   ├── app.ts                    # root component
│   └── ...
├── index.html                    # app shell
└── styles.css                    # global theme variables
```

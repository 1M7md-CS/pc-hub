import { Component } from '@angular/core';

import { FeaturedProducts } from './featured-products/featured-products';
import { Footer } from './footer/footer';
import { Hero } from './hero/hero';
import { Navbar } from './navbar/navbar';
import { ProductOfTheMonth } from './product-of-the-month/product-of-the-month';
import { PromoBanner } from './promo-banner/promo-banner';
import { ShopByCategory } from './shop-by-category/shop-by-category';
import { Testimonials } from './testimonials/testimonials';
import { WhyChooseUs } from './why-choose-us/why-choose-us';

@Component({
  selector: 'app-home',
  imports: [
    Hero,
    Navbar,
    ShopByCategory,
    FeaturedProducts,
    WhyChooseUs,
    PromoBanner,
    ProductOfTheMonth,
    Testimonials,
    Footer,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}

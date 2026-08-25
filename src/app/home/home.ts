import { Component } from '@angular/core';

import { FeaturedProducts } from './featured-products/featured-products';
import { Hero } from './hero/hero';
import { Navbar } from './navbar/navbar';
import { ShopByCategory } from './shop-by-category/shop-by-category';
import { WhyChooseUs } from "./why-choose-us/why-choose-us";
import { PromoBanner } from "./promo-banner/promo-banner";
import { BuildOfTheMonth } from "./build-of-the-month/build-of-the-month";

@Component({
  selector: 'app-home',
  imports: [Hero, Navbar, ShopByCategory, FeaturedProducts, WhyChooseUs, PromoBanner, BuildOfTheMonth],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}

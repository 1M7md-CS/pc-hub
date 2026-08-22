import { Component } from '@angular/core';
import { Hero } from './hero/hero';
import { Navbar } from './navbar/navbar';
import { ShopByCategory } from './shop-by-category/shop-by-category';
import { FeaturedProducts } from "./featured-products/featured-products";

@Component({
  selector: 'app-home',
  imports: [Hero, Navbar, ShopByCategory, FeaturedProducts],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}

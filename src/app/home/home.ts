import { Component } from '@angular/core';
import { Hero } from './hero/hero';
import { Navbar } from './navbar/navbar';
import { ShopByCategory } from "./shop-by-category/shop-by-category";

@Component({
  selector: 'app-home',
  imports: [Hero, Navbar, ShopByCategory],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}

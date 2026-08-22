import { Component } from '@angular/core';
import { Hero } from './hero/hero';
import { Navbar } from "./navbar/navbar";

@Component({
  selector: 'app-home',
  imports: [Hero, Navbar],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Navbar } from './layouts/navbar/navbar';
import { Home } from './features/home/home';
import { About } from './features/about/about';
import { Portfolio } from './features/portfolio/portfolio';
import { Contact } from './features/contact/contact';

@Component({
  imports: [Navbar, Home, About, Portfolio, Contact],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}

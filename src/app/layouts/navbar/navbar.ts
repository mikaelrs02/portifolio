import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  signal,
} from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-navbar',
  imports: [TranslocoPipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar implements AfterViewInit, OnDestroy {
  protected readonly isMenuOpen = signal(false);
  protected readonly activeSection = signal('home');
  private sectionObserver?: IntersectionObserver;

  constructor(protected readonly languageService: LanguageService) {}

  ngAfterViewInit(): void {
    this.sectionObserver = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              second.intersectionRatio - first.intersectionRatio,
          )[0];

        if (visibleSection) {
          this.activeSection.set(visibleSection.target.id);
        }
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0.1, 0.5, 1] },
    );

    document
      .querySelectorAll('main > section[id]')
      .forEach((section) => this.sectionObserver?.observe(section));
  }

  ngOnDestroy(): void {
    this.sectionObserver?.disconnect();
  }

  protected toggleMenu(): void {
    this.isMenuOpen.update((isOpen) => !isOpen);
  }

  protected closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  protected changeLanguage(): void {
    this.languageService.toggleLanguage();
  }

  protected navigateTo(section: string): void {
    this.closeMenu();
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }
}

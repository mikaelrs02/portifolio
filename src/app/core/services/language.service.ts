import { Injectable, signal } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

export type SupportedLanguage = 'pt' | 'en';

const STORAGE_KEY = 'portfolio-language';
const DEFAULT_LANGUAGE: SupportedLanguage = 'pt';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly currentLanguage = signal<SupportedLanguage>(
    this.getInitialLanguage(),
  );

  readonly language = this.currentLanguage.asReadonly();

  constructor(private readonly transloco: TranslocoService) {
    this.transloco.setActiveLang(this.currentLanguage());
  }

  toggleLanguage(): void {
    const nextLanguage: SupportedLanguage =
      this.currentLanguage() === 'pt' ? 'en' : 'pt';

    this.currentLanguage.set(nextLanguage);
    this.transloco.setActiveLang(nextLanguage);
    localStorage.setItem(STORAGE_KEY, nextLanguage);
    document.documentElement.lang = nextLanguage;
  }

  private getInitialLanguage(): SupportedLanguage {
    if (typeof window === 'undefined') {
      return DEFAULT_LANGUAGE;
    }

    const savedLanguage = localStorage.getItem(STORAGE_KEY);
    if (this.isSupportedLanguage(savedLanguage)) {
      return savedLanguage;
    }

    return navigator.language.toLowerCase().startsWith('pt') ? 'pt' : 'en';
  }

  private isSupportedLanguage(
    language: string | null,
  ): language is SupportedLanguage {
    return language === 'pt' || language === 'en';
  }
}

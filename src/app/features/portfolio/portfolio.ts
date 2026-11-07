import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

type PortfolioCategory = 'projects' | 'certificates';

interface PortfolioItem {
  readonly icon: string;
  readonly titleKey: string;
  readonly descriptionKey: string;
  readonly statusKey?: string;
  readonly dateKey?: string;
  readonly fileUrl?: string;
  readonly previewUrl?: string;
  readonly hidePreview?: boolean;
}

@Component({
  selector: 'app-portfolio',
  imports: [TranslocoPipe],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Portfolio {
  readonly activeCategory = signal<PortfolioCategory>('projects');
  readonly activeIndex = signal(0);

  readonly projects: readonly PortfolioItem[] = [
    {
      icon: '',
      titleKey: 'portfolio.projects.maintenance.title',
      descriptionKey: 'portfolio.projects.maintenance.description',
      statusKey: 'portfolio.status.maintenance',
      hidePreview: true,
    },
    {
      icon: '',
      titleKey: 'portfolio.projects.maintenance.title',
      descriptionKey: 'portfolio.projects.maintenance.description',
      statusKey: 'portfolio.status.maintenance',
      hidePreview: true,
    },
    {
      icon: '',
      titleKey: 'portfolio.projects.maintenance.title',
      descriptionKey: 'portfolio.projects.maintenance.description',
      statusKey: 'portfolio.status.maintenance',
      hidePreview: true,
    },
  ];

  readonly certificates: readonly PortfolioItem[] = [
    {
      icon: 'workspace_premium',
      titleKey: 'portfolio.certificates.items.java.title',
      descriptionKey: 'portfolio.certificates.items.java.description',
      dateKey: 'portfolio.certificates.items.java.date',
      fileUrl: '/certificates/Certificado%20Java.png',
      previewUrl: '/certificates/Certificado%20Java.png',
    },
    {
      icon: 'database',
      titleKey: 'portfolio.certificates.items.database.title',
      descriptionKey: 'portfolio.certificates.items.database.description',
      dateKey: 'portfolio.certificates.items.database.date',
      fileUrl: '/certificates/Certificado%20Banco%20de%20dados.png',
      previewUrl: '/certificates/Certificado%20Banco%20de%20dados.png',
    },
    {
      icon: 'web',
      titleKey: 'portfolio.certificates.items.angular.title',
      descriptionKey: 'portfolio.certificates.items.angular.description',
      dateKey: 'portfolio.certificates.items.angular.date',
      fileUrl: '/certificates/Certificado%20Angular.png',
      previewUrl: '/certificates/Certificado%20Angular.png',
    },
    {
      icon: 'code',
      titleKey: 'portfolio.certificates.items.git.title',
      descriptionKey: 'portfolio.certificates.items.git.description',
      dateKey: 'portfolio.certificates.items.git.date',
      fileUrl: '/certificates/Certificado%20Git.jpg',
      previewUrl: '/certificates/Certificado%20Git.jpg',
    },
    {
      icon: 'web',
      titleKey: 'portfolio.certificates.items.frontend.title',
      descriptionKey: 'portfolio.certificates.items.frontend.description',
      dateKey: 'portfolio.certificates.items.frontend.date',
      fileUrl: '/certificates/Certificado%20VNW.png',
      previewUrl: '/certificates/Certificado%20VNW.png',
    },
    {
      icon: 'web',
      titleKey: 'portfolio.certificates.items.angularCourse.title',
      descriptionKey: 'portfolio.certificates.items.angularCourse.description',
      dateKey: 'portfolio.certificates.items.angularCourse.date',
      fileUrl: '/certificates/Certificado%20Angular%20udemy.png',
      previewUrl: '/certificates/Certificado%20Angular%20udemy.png',
    },
  ];

  readonly activeItems = computed(() =>
    this.activeCategory() === 'projects' ? this.projects : this.certificates,
  );

  readonly visibleItems = computed(() => {
    const items = this.activeItems();
    const start = this.activeIndex();

    return Array.from({ length: Math.min(3, items.length) }, (_, offset) => {
      return items[(start + offset) % items.length];
    });
  });

  selectCategory(category: PortfolioCategory): void {
    this.activeCategory.set(category);
    this.activeIndex.set(0);
  }

  previousItem(): void {
    const items = this.activeItems();
    this.activeIndex.update((index) => (index - 1 + items.length) % items.length);
  }

  nextItem(): void {
    const items = this.activeItems();
    this.activeIndex.update((index) => (index + 1) % items.length);
  }

  selectItem(index: number): void {
    this.activeIndex.set(index);
  }
}

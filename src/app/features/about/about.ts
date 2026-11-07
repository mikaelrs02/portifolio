import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { SkillsGlobe } from '../../shared/components/skills-globe/skills-globe';

@Component({
  selector: 'app-about',
  imports: [TranslocoPipe, SkillsGlobe],
  templateUrl: './about.html',
  styleUrl: './about.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  protected readonly experienceItems = [
    {
      key: 'anbima',
      roleKey: 'about.experience.items.anbima.role',
      companyKey: 'about.experience.items.anbima.company',
      periodKey: 'about.experience.items.anbima.period',
      bullets: [
        'about.experience.items.anbima.bullets.one',
        'about.experience.items.anbima.bullets.two',
        'about.experience.items.anbima.bullets.three',
        'about.experience.items.anbima.bullets.four',
        'about.experience.items.anbima.bullets.five',
        'about.experience.items.anbima.bullets.six',
      ],
    },
    {
      key: 'ffa',
      roleKey: 'about.experience.items.ffa.role',
      companyKey: 'about.experience.items.ffa.company',
      periodKey: 'about.experience.items.ffa.period',
      bullets: [
        'about.experience.items.ffa.bullets.one',
        'about.experience.items.ffa.bullets.two',
        'about.experience.items.ffa.bullets.three',
      ],
    },
    {
      key: 'newsSystems',
      roleKey: 'about.experience.items.newsSystems.role',
      companyKey: 'about.experience.items.newsSystems.company',
      periodKey: 'about.experience.items.newsSystems.period',
      bullets: [
        'about.experience.items.newsSystems.bullets.one',
        'about.experience.items.newsSystems.bullets.two',
        'about.experience.items.newsSystems.bullets.three',
        'about.experience.items.newsSystems.bullets.four',
      ],
    },
  ] as const;

  protected readonly skillGroups = [
    {
      key: 'backend',
      skills: [
        ['java.svg', 'Java'],
        ['openjdk.svg', 'OpenJDK'],
        ['spring.svg', 'Spring Boot'],
        ['php.svg', 'PHP'],
        ['laravel.svg', 'Laravel'],
        ['nodejs.svg', 'Node.js'],
        ['python.svg', 'Python'],
      ],
    },
    {
      key: 'frontend',
      skills: [
        ['angular.svg', 'Angular'],
        ['typescript.svg', 'TypeScript'],
        ['javascript.svg', 'JavaScript'],
        ['react.svg', 'React'],
        ['html5.svg', 'HTML5'],
        ['css3.svg', 'CSS3'],
        ['sass.svg', 'Sass'],
        ['tailwind.svg', 'Tailwind CSS'],
        ['vite.svg', 'Vite'],
      ],
    },
    {
      key: 'databases',
      skills: [
        ['mysql.svg', 'MySQL'],
        ['postgresql.svg', 'PostgreSQL'],
        ['oracle.svg', 'Oracle'],
      ],
    },
    {
      key: 'devops',
      skills: [
        ['docker.svg', 'Docker'],
        ['jenkins.svg', 'Jenkins'],
        ['nginx.svg', 'NGINX'],
        ['aws.svg', 'AWS'],
        ['linux.svg', 'Linux'],
      ],
    },
    {
      key: 'tools',
      skills: [
        ['git.svg', 'Git'],
        ['junit.svg', 'JUnit'],
      ],
    },
  ] as const;
}

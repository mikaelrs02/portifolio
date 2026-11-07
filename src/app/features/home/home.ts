import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-home',
  imports: [TranslocoPipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly resumeUrl = '/documents/curriculum-mikael-ribeiro.pdf';
  protected readonly githubUrl = 'https://github.com/mikaelrs02';
  protected readonly linkedinUrl =
    'https://www.linkedin.com/in/mikael-ribeiro-6a262220b/';
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-contact',
  imports: [TranslocoPipe],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  protected readonly githubUrl = 'https://github.com/mikaelrs02';
  protected readonly linkedinUrl =
    'https://www.linkedin.com/in/mikael-ribeiro-6a262220b/';
  protected readonly email = 'mikaelribeirors@gmail.com';
  protected readonly emailUrl = `mailto:${this.email}`;
  protected readonly phone = '+55 (21) 97912-7146';
  protected readonly phoneUrl = 'tel:+5521979127146';
}

// * Base
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// * Components
import HeaderComponent from './components/header/header.component';

@Component({
  standalone: true,
  selector: 'app-base',
  styles: [
    `
      .wrapper {
        padding-top: 100px;
      }
    `,
  ],
  template: `<app-header></app-header>
    <div class="wrapper">
      <router-outlet></router-outlet>
    </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, HeaderComponent],
})
export default class BaseComponent {}

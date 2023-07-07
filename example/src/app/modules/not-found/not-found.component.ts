// * Base
import { RouterLink } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-not-found',
  template: `<section>
    <span>404</span>
    <a routerLink="" class="button">HOME</a>
  </section>`,
  styleUrls: ['./not-found.component.scss'],
  imports: [RouterLink],
})
export default class NotFoundComponent {}

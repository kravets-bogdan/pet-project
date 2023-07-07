// * Base
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';

// * Componetns
import BurgerComponent from '../burger/burger.component';

// * Service
import HeaderService from './header.service';

// * Directives
import StyleDirective from 'src/app/directive/style.directive';

// * Types
import { INavigation } from '../../../types/header-navigation.types';
import { NgFor, NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HeaderService],
  imports: [BurgerComponent, StyleDirective, NgIf, NgFor, RouterLink],
})
export default class HeaderComponent implements OnDestroy {
  // * Injects
  private readonly navigationService = inject(HeaderService);
  private readonly cdr = inject(ChangeDetectorRef);

  // * Local
  protected navigationList: INavigation[] = [];
  protected isShowNavigation: boolean = false;
  protected isMobileMode: boolean = false;

  constructor() {
    this.navigationList = this.navigationService.navigationList;
    window.addEventListener('resize', () => this.resize());
    this.isMobileMode = window.innerWidth < 1024;
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.resize);
  }

  private resize() {
    this.isMobileMode = window.innerWidth < 1024;
    this.cdr.detectChanges();
    if (!this.isMobileMode) {
      this.isShowNavigation = false;
    }
  }
}

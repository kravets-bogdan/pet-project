// * Base
import { Injectable } from '@angular/core';

// * Types
import {
  NavigationRouteType,
  INavigation,
} from '../../../types/header-navigation.types';

@Injectable()
export default class HeaderService {
  readonly navigationList: INavigation[] = [
    {
      link: 'Home',
      route: NavigationRouteType.HOME,
    },
    {
      link: 'Form',
      route: NavigationRouteType.FORM,
    },
    {
      link: 'Contacts',
      route: NavigationRouteType.CONTACTS,
    },
    {
      link: 'Shop',
      route: NavigationRouteType.SHOP,
    },
  ];
}

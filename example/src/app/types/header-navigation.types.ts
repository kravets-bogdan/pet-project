export interface INavigation {
  link: string;
  route: NavigationRouteType;
}

export enum NavigationRouteType {
  CONTACTS = 'contacts',
  FORM = 'form',
  SHOP = 'shop',
  HOME = '',
}

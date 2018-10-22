export default [
  {
    name: 'home',
    route: ['', 'home'],
    moduleId: 'home/home',
    href: '#/',
    nav: true,
    title: 'Home',
    settings: { iconClass: 'icon-home' }
  },
  {
    name: 'login',
    route: 'login',
    moduleId: 'login/login',
    href: '#/login',
    nav: true,
    title: 'login',
    settings: { iconClass: 'icon-enter' }
  },
  {
    name: 'signin',
    route: 'signin',
    moduleId: 'signin/signin',
    href: '#/signin',
    nav: true,
    title: 'Sign in',
    settings: {iconClass: 'icon-key'}

  },
  {
    name: 'users',
    route: 'users',
    moduleId: 'users/users',
    href: '#/users',
    nav: true,
    title: 'Users',
    settings: {iconClass: 'icon-user'}

  }
];

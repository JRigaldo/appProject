export default [
  {
    name: 'home',
    route: ['', 'home'],
    moduleId: 'home/home',
    href: '#/',
    nav: true,
    title: 'Home',
    settings: {
      iconClass: 'icon-home',
      iconCross: 'icon-cross'
    }
  },
  {
    name: 'login',
    route: 'login',
    moduleId: 'login/index',
    href: '#/login',
    nav: true,
    title: 'Log in',
    settings: {
      iconClass: 'icon-key',
      iconCross: 'icon-cross'
    }
  },
  {
    name: 'signin',
    route: 'signin',
    moduleId: 'signin/signin',
    href: '#/signin',
    nav: true,
    title: 'Sign in',
    settings: {
      iconClass: 'icon-key',
      iconCross: 'icon-cross'
    }
  },
  {
    name: 'users',
    route: 'users',
    moduleId: 'users/users',
    href: '#/users',
    nav: true,
    title: 'Users',
    settings: {
      iconClass: 'icon-user',
      iconCross: 'icon-cross'
    }
  }
];

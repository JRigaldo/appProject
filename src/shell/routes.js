export default [
  {
    route: ['', 'home'],
    name: 'home',
    moduleId: 'posts/index',
    nav: true,
    title: 'Home',
    settings: {
      iconClass: 'icon-home',
      iconCross: 'icon-cross'
    }
  },
  {
    route: 'post/:slug',
    name: 'post-view',
    moduleId: 'posts/view',
    title: 'View Post'
  },
  {
    route: 'login',
    name: 'login',
    moduleId: 'login/login',
    nav: true,
    title: 'Login',
    settings: {
      iconClass: 'icon-key',
      iconCross: 'icon-cross'
    }
  }
];

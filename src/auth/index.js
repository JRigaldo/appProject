import routes from './routes';

export class Index{

  configureRouter(config, router) {
    this.router = router;
    config.map(routes);
  }

}

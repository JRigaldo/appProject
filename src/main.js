import environment from './environment';
import {I18N, Backend} from "aurelia-i18n";

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources')
    .plugin('aurelia-validation')
<<<<<<< HEAD
    .plugin('aurelia-dialog');
=======
    .plugin('aurelia-i18n', instance => {
      instance.i18next.use(Backend.with(aurelia.loader));
        return instance.setup({
          backend: {
            loadPath: './locales/{{lng}}/{{ns}}.json'
          },
          lng: 'en',
          fallbackLng: 'fr',
          ns: ['nav', 'post-form'],
          debug: false
        });
    });
>>>>>>> i18n

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  return aurelia.start().then(() => aurelia.setRoot('shell/shell'));
}

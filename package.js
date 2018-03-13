/**
 * Inspired by https://github.com/hitchcott/meteor-method-hooks (MIT License)
 */

Package.describe({
  name: 'seba:method-hooks',
  summary: 'Provides before/after hooks for Meteor methods',
  version: '2.0.0',
  git: 'https://github.com/sebakerckhof/meteor-method-hooks'
});

Package.on_use(function (api) {
  api.versionsFrom('METEOR@1.6.1');
  api.use('meteor');
  api.use('ecmascript');
  api.mainModule('method-hooks.js');
});

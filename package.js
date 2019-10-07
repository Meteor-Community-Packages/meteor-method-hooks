/**
 * Inspired by https://github.com/hitchcott/meteor-method-hooks (MIT License)
 */


Package.describe({
  name: 'seba:method-hooks',
  summary: 'Provides before/after hooks for Meteor methods',
  version: '3.0.2',
  git: 'https://github.com/Meteor-Community-Packages/meteor-method-hooks'
});

Package.on_use(function (api) {
  api.versionsFrom('METEOR@1.8');
  api.use('meteor');
  api.use('ecmascript');
  api.mainModule('server.js', 'server');
  api.mainModule('client.js', 'client');
});

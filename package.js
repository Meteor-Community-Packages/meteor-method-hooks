/**
 * Inspired by https://github.com/hitchcott/meteor-method-hooks (MIT License)
 */

Package.describe({
  name: 'seba:method-hooks',
  summary: 'Provides before/after hooks for Meteor methods',
  version: '3.0.4',
  git: 'https://github.com/Meteor-Community-Packages/meteor-method-hooks',
});

Package.onUse(function definePackage(api) {
  api.versionsFrom('1.12.1');
  api.use('meteor');
  api.use('ecmascript');
  api.mainModule('server.js', 'server');
  api.mainModule('client.js', 'client');
});

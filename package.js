/**
 * Inspired by https://github.com/hitchcott/meteor-method-hooks (MIT License)
 */

Package.describe({
  name: 'seba:method-hooks',
  summary: 'Provides before/after hooks for Meteor methods',
  version: '4.0.0-rc.1',
  git: 'https://github.com/Meteor-Community-Packages/meteor-method-hooks',
});

Package.onUse(function definePackage(api) {
  api.versionsFrom(['1.12.1', '2.3', '3.0.1']);
  api.use('ecmascript');
  api.mainModule('server.js', 'server');
  api.mainModule('client.js', 'client');
});

/**
 * Inspired by https://github.com/hitchcott/meteor-method-hooks (MIT License)
 */

Package.describe({
  summary: 'Provides before/after hooks for Meteor methods',
  version: '1.0.0',
  name: 'sebakerckhof:method-hooks',
  git: 'https://github.com/sebakerckhof/meteor-method-hooks'
});

Package.on_use(function (api) {
  if(api.versionsFrom) {
    api.versionsFrom('METEOR@0.9.0');
  }

  api.add_files([
    'method-hooks.js'
  ], ['client','server']);


});
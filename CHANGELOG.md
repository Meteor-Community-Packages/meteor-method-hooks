# Changelog

## v3.0.4 UNRELEASED

Minimum Meteor version is v1.12.1

## v3.0.3 (31-12-2022)

Updated package api, so that it can be used in the latest Meteor.

## v3.0.2 (06-02-2019)

New strategy for client side

## v3.0.1 (05-02-2019)

Fix for when the method throws

## v3.0.0 (29-01-2019)

Modify the client side so we can also hook into method calls that exist only on the server

**Breaking change** `beforeMethods` and `afterMethods` have been renamed to `beforeMethod` and `afterMethod`

**Breaking change** The hooks on the client side are now triggered before and after the server call. Not before and after the simulated client-side call.

**Breaking change** in the hooks running after the method, the result is now accessible via `this.result` instead of `this._result`. Changing `this.result` will change the passed result.

**Breaking change** Even when the method throws, the after hooks are still called. `this.error` will contain the error object that was thrown.

## v2.0.0 (12-03-2018)

Updated for Meteor 1.6 and rewritten in modern JS.

**Breaking change** in the hooks running after the method, the result is bound to the this object (as `this._result`) instead of passed as last argument.

## v1.0.0 (11-08-2015)

Initial release

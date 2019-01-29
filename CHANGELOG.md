# Changelog

## v3.0.0 (29-01-2019)

Modify the client side so we can also hook into method calls that exist only on the server

**Breaking change** `beforeMethods` and `afterMethods` have been renamed to `beforeMethod` and `afterMethod`

**Breaking change** The hooks on the client side are now triggered before and after the server call. Not before and after the simulated client-side call.

## v2.0.0 (12-03-2018)

Updated for Meteor 1.6 and rewritten in modern JS.

**Breaking change** in the hooks running after the method, the result is bound to the this object (as `this._result`) instead of passed as last argument.

## v1.0.0 (11-08-2015)

Initial release
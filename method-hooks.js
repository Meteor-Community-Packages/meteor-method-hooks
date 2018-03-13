import { Meteor } from 'meteor/meteor';

const hasOwn = Object.prototype.hasOwnProperty;

const methodHooks = Object.create(null);
const allMethodHooks = { before: [], after: [] };

const registerMethodHook = function(methodNames, position, fn) {
  if (!Array.isArray(methodNames)) {
    methodNames = [methodNames];
  }

  const results = [];

  for (const methodName of methodNames) {
    if (!methodHooks[methodName]) {
      methodHooks[methodName] = {
        before: [],
        after: [],
      };
    }
    results.push(methodHooks[methodName][position].unshift(fn));
  }

  return results;
};

const wrap = function(methodName) {
  let fn;
  if (Meteor.isServer) {
    fn = Meteor.server.method_handlers[methodName];
  } else {
    fn = Meteor.connection._methodHandlers[methodName];
  }

  return function(...args) {
    this._methodName = methodName;

    let beforeFns = allMethodHooks.before;
    if (hasOwn.call(methodHooks, methodName)) {
      beforeFns = [
        ...beforeFns,
        ...methodHooks[methodName].before,
      ];
    }

    for (const beforeFn of beforeFns) {
      if (beforeFn.apply(this, args) === false) {
        return false;
      }
    }

    this._result = fn.apply(this, args);

    let afterFns = allMethodHooks.after;
    if (hasOwn.call(methodHooks, methodName)) {
      afterFns = [
        ...afterFns,
        ...methodHooks[methodName].after,
      ];
    }

    for (const afterFn of afterFns) {
      const result = afterFn.apply(this, args);
      if (result !== undefined) {
        this._result = result;
      }
    }

    return this._result;
  };
};

Meteor.beforeMethods = (methodName, fn) => registerMethodHook(methodName, 'before', fn);

Meteor.afterMethods = (methodName, fn) => registerMethodHook(methodName, 'after', fn);

Meteor.beforeAllMethods = fn => allMethodHooks.before.unshift(fn);

Meteor.afterAllMethods = fn => allMethodHooks.after.unshift(fn);

Meteor.startup(function() {
  let methodHandlers;
  if (Meteor.isServer) {
    methodHandlers = Meteor.server.method_handlers;
  } else {
    methodHandlers = Meteor.connection._methodHandlers;
  }

  Object.keys(methodHandlers).forEach((method) => {
    methodHandlers[method] = wrap(method);
  });
});

import { Meteor } from 'meteor/meteor';
import { getHooksAfter, getHooksBefore } from './common';

function wrap(methodName) {
  const fn = Meteor.server.method_handlers[methodName];

  return async function wrappedMethodHandler(...args) {
    this._methodName = methodName;

    const beforeFns = getHooksBefore(methodName);
    const afterFns = getHooksAfter(methodName);

    if (!beforeFns.length && !afterFns.length) {
      return fn.apply(this, args);
    }

    for (const beforeFn of beforeFns) {
      if (beforeFn.apply(this, args) === false) {
        return false;
      }
    }

    try {
      this.result = await fn.apply(this, args);
    } catch (error) {
      this.error = error;
    }

    for (const afterFn of afterFns) {
      try { afterFn.apply(this, args); } catch (error) { /* */ }
    }

    if (this.error) {
      throw this.error;
    }

    return this.result;
  };
}

Meteor.startup(() => {
  const methodHandlers = Meteor.server.method_handlers;
  Object.keys(methodHandlers).forEach((method) => {
    methodHandlers[method] = wrap(method);
  });
});

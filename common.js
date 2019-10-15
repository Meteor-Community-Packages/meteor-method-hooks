import { Meteor } from 'meteor/meteor';

const hasOwn = Object.prototype.hasOwnProperty;

const methodHooks = Object.create(null);
const allMethodHooks = { before: [], after: [] };

function registerMethodHook(methodNames, position, fn) {
  if (!Array.isArray(methodNames)) {
    // eslint-disable-next-line
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
}

Meteor.beforeMethod = (methodName, fn) => registerMethodHook(methodName,
  'before', fn);

Meteor.afterMethod = (methodName, fn) => registerMethodHook(methodName,
  'after', fn);

Meteor.beforeAllMethods = fn => allMethodHooks.before.unshift(fn);

Meteor.afterAllMethods = fn => allMethodHooks.after.unshift(fn);

function getHooks(method, point) {
  const fns = [...allMethodHooks[point]];
  if (hasOwn.call(methodHooks, method)) {
    fns.push(...methodHooks[method][point]);
  }
  return fns;
}

export function getHooksBefore(method) {
  return getHooks(method, 'before');
}

export function getHooksAfter(method) {
  return getHooks(method, 'after');
}

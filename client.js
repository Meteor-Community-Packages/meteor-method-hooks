import { Meteor } from 'meteor/meteor';
import { getHooksAfter, getHooksBefore } from './common';

const originalApply = Meteor.connection.apply.bind(Meteor.connection);

Meteor.connection.apply = function apply(name, args, options, callback) {
  const beforeFns = getHooksBefore(name);
  for (const beforeFn of beforeFns) {
    if (beforeFn.apply(this, args) === false) {
      return false;
    }
  }

  const afterFns = getHooksAfter(name);
  if (afterFns.length) {
    // We were passed 3 arguments. They may be either (name, args, options)
    // or (name, args, callback)
    if (!callback && typeof options === 'function') {
      callback = options;
      options = {};
    }
    options = options || {};

    const originalCallback = callback;
    callback = (error, result) => {
      this._error = error;
      this._result = result;

      for (const afterFn of afterFns) {
        const newResult = afterFn.apply(this, args);
        if (newResult !== undefined) {
          this._result = newResult;
        }
      }

      originalCallback(error, this._result);
    };
  }

  originalApply.call(this, name, args, options, callback);
};

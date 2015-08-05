var methodHooks, allMethodHooks, registerMethodHook, wrap;

methodHooks = {};
allMethodHooks = {before:[],after:[]};

registerMethodHook = function(methodNames, position, fn) {
  var i, len, methodName, results;
  if (!(methodNames instanceof Array)) {
    methodNames = [methodNames];
  }
  results = [];
  for (i = 0, len = methodNames.length; i < len; i++) {
    methodName = methodNames[i];
    if (methodHooks[methodName] == null) {
      methodHooks[methodName] = {
        before: [],
        after: []
      };
    }
    results.push(methodHooks[methodName][position].unshift(fn));
  }
  return results;
};

Meteor.beforeMethods = function(methodName, fn) {
  return registerMethodHook(methodName, 'before', fn);
};

Meteor.afterMethods = function(methodName, fn) {
  return registerMethodHook(methodName, 'after', fn);
};

Meteor.beforeAllMethods = function(fn) {
  allMethodHooks.before.unshift(fn);
};

Meteor.afterAllMethods = function(methodName, fn) {
  allMethodHooks.after.unshift(fn);
};

wrap = function(methodName) {
  if(Meteor.isServer){
    var fn = Meteor.server.method_handlers[methodName];
  }else{
    var fn = Meteor.connection._methodHandlers[methodName];
  }


  return function() {var result, args, beforeFns, afterFns, i, len;

    args = Array.prototype.slice.call(arguments);
    this._methodName = methodName;

    beforeFns = allMethodHooks.before;
    if(methodHooks.hasOwnProperty(methodName)){
      beforeFns = beforeFns.concat(methodHooks[methodName].before);
    }

    for(i = 0, len = beforeFns.length; i < len; i++){
      if(beforeFns[i].apply(this, args) === false){
        return false;
      }
    }

    result = fn.apply(this, args);

    afterFns = allMethodHooks.after;
    if(methodHooks.hasOwnProperty(methodName)){
      afterFns = afterFns.concat(methodHooks[methodName].after);
    }

    args.push(result);
    for(i = 0, len = afterFns.length; i < len; i++){
      result = afterFns[i].apply(this, args);
      if(!_.isNull(result) && !_.isUndefined(result)){
        args[args.length-1] = result;
      }
    }

    return result;

  };
};

Meteor.startup(function() {
  var methodHandlers;
  if(Meteor.isServer){
    methodHandlers = Meteor.server.method_handlers;
  }else{
    methodHandlers = Meteor.connection._methodHandlers;
  }
  for(var method in methodHandlers){
    if(!methodHandlers.hasOwnProperty(method))continue;
    methodHandlers[method] = wrap(method);
  }
});
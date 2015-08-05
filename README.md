# Meteor Method Hooks

### Before/after hooks for Meteor methods

This package extends Meteor with four methods:
* `Meteor.beforeMethods` 
* `Meteor.afterMethods`
* `Meteor.beforeAllMethods` 
* `Meteor.afterAllMethods`

This package differs from hitchcott:method-hooks in that:
* You can add hooks for all methods
* It works on both client and server
* You can add and remove hooks at runtime. 
* After methods can change the methods result

The `beforeMethods` method can be used for securing `Meteor.methods` based on the result of a definable function.
Any `beforeMethods` that return `false` will stop the relevent method and any other hooks from executing.

Here's an example for checking user login:

```js
Meteor.beforeMethods('test',function(){
  if(!Meteor.userId()) return false;
})
```
You can also pass an array of method names as first parameter.

Uses include:

* Security
* Logging
* [insert imaginative idea]

The before methods get the same arguments as the original method, 
the after method gets the arguments + the result of the original method. 
If it returns a value that is not null or undefined, then this will replace the original result.

## TODO
* Testing

## Credits
Inspired by: [Chris Hitchcott](https://github.com/hitchcott/meteor-method-hooks), 2015
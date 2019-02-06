import { getHooksAfter, getHooksBefore } from './common';
import MethodInvoker from 'meteor/ddp-client/common/MethodInvoker.js'

const originalSend = MethodInvoker.prototype.sendMessage
const originalReceive = MethodInvoker.prototype.receiveResult;

MethodInvoker.prototype.sendMessage = function sendMessage() {
  if (this._message.msg === 'method') {
    const beforeFns = getHooksBefore(this._message.method);
    for (const beforeFn of beforeFns) {
      if (beforeFn.apply(this, this._message.params) === false) {
        return false;
      }
    }
  }
 
  originalSend.call(this);
}

MethodInvoker.prototype.receiveResult = function receiveResult(error, result) {
  const context = {
    error,
    result
  }

  if (!this.gotResult()) {
    const afterFns = getHooksAfter(this._message.method);
    for (const afterFn of afterFns) {
      try { afterFn.apply(context, this._message.params) } catch (error) {
        console.log(error);
      }
    }
  }

  originalReceive.call(this, context.error, context.result);
}
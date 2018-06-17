import { EventEmitter } from 'events';

export class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(name, listener) {
    this.events[name] = this.events[name] || [];
    this.events[name] = [...this.events[name], listener];
  }

  off(name, listener) {
    if (listener) {
      this.events[name] = this.events[name].filter(l => l !== listener);
    } else {
      delete this.events[name];
    }
  }

  emit(name, ...args) {
    this.events[name].forEach(listener => listener(...args));
  }
}

const emitter = new EventEmitter();

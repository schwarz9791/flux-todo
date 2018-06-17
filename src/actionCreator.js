export default class ActionCreator {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }

  addTodo(text) {
    this.dispatcher.emit('addTodo', text);
  }

  deleteTodo(id) {
    this.dispatcher.emit('deleteTodo', id);
  }

  completeTodo(id) {
    this.dispatcher.emit('completeTodo', id);
  }
}

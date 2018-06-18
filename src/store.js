import { EventEmitter } from 'events';

export default class Store extends EventEmitter {
  constructor(dispatcher) {
    super();
    const todos = JSON.parse(sessionStorage.getItem('todos'));
    this.state = {
      todos: todos || []
    }
    dispatcher.on('addTodo', this.onAddTodo.bind(this));
    dispatcher.on('updateTodo', this.onUpdateTodo.bind(this));
    dispatcher.on('deleteTodo', this.onDeleteTodo.bind(this));
    dispatcher.on('completeTodo', this.onCompleteTodo.bind(this));
  }

  getState() {
    return this.state;
  }

  onAddTodo(text) {
    this.state.todos =  [...this.state.todos, {
      id: Date.now(),
      complete: false,
      text
    }];
    this.emit('CHANGE');
  }

  onUpdateTodo(id, text) {
    this.state.todos = this.state.todos.map(todo => {
      if (todo.id === id) {
        todo.text = text;
      }
      return todo;
    });
    this.emit('CHANGE');
  }

  onDeleteTodo(id) {
    this.state.todos = this.state.todos.filter(todo => todo.id !== id);
    this.emit('CHANGE');
  }

  onCompleteTodo(id) {
    this.state.todos = this.state.todos.map(todo => {
      if (todo.id === id) {
        todo.complete = !todo.complete;
      }
      return todo;
    });
    this.emit('CHANGE');
  }
}

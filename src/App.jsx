import React, { Component } from 'react';
import { EventEmitter } from 'events';
import ActionCreator from './actionCreator';
import Store from './store';
import TodoList from './TodoList';

const dispatcher = new EventEmitter();
const action = new ActionCreator(dispatcher);
const store = new Store(dispatcher);

export default class App extends Component {
  constructor() {
    super();
    const { todos } = store.getState();
    this.state = { todos };

  store.on('CHANGE', this.onChangeState.bind(this));
  }

  render() {
    return (
      <div>
        <input
          type='text'
          ref='input'
          placeholder='Input todo'
        />
        <button onClick={() => action.addTodo(this.refs.input.value)}>Add</button>
        <TodoList
          todos={this.state.todos}
          onClickCheckbox={this.handleCompleteTodo}
          onClickDelete={this.handleDeleteTodo}
        />
      </div>
    )
  }

  onChangeState() {
    const { todos } = store.getState();
    this.setState({ todos });
  }

  handleCompleteTodo(id) {
    action.completeTodo(id);
  }

  handleDeleteTodo(id) {
    action.deleteTodo(id);
  }
}

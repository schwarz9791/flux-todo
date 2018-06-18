import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { EventEmitter } from 'events';
import ActionCreator from './actionCreator';
import Store from './store';

import TodoDetail from './TodoDetail';
import TodoContainer from './TodoContainer';

const dispatcher = new EventEmitter();
const action = new ActionCreator(dispatcher);
const store = new Store(dispatcher);

export default class App extends Component {
  constructor(props) {
    super(props);
    const { todos } = store.getState();
    this.state = { todos };

    store.on('CHANGE', this.onChangeState.bind(this));
  }

  render() {
    return (
      <Switch>
        <Route exact path="/todos/:id" component={TodoDetail} />
        <Route exact path="/todos"
          render={() => <TodoContainer
            todos={this.state.todos}
            handleAddTodo={this.handleAddTodo}
            handleCompleteTodo={this.handleCompleteTodo}
            handleDeleteTodo={this.handleDeleteTodo}
            />} />
      </Switch>
    )
  }

  onChangeState() {
    const { todos } = store.getState();
    this.setState({ todos });
    sessionStorage.setItem('todos', JSON.stringify(todos));
  }

  handleAddTodo(text) {
    action.addTodo(text);
  }

  handleCompleteTodo(id) {
    action.completeTodo(id);
  }

  handleDeleteTodo(id) {
    action.deleteTodo(id);
  }
}

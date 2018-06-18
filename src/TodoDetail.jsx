import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { EventEmitter } from 'events';
import ActionCreator from './actionCreator';
import Store from './store';
import Moment from 'react-moment';
import 'moment-timezone';

const dispatcher = new EventEmitter();
const action = new ActionCreator(dispatcher);
const store = new Store(dispatcher);

class TodoDetail extends Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    const { todos } = store.getState();
    this.state = {
      todo: todos.find(todo => todo.id === parseInt(match.params.id, 10))
    }

    store.on('CHANGE', this.onChangeState.bind(this));
  }

  handleChange(e) {
    const { id, complete } = this.state.todo;
    this.setState({
      todo: {
        id,
        complete,
        text: e.target.value
      }
    })
  }

  render() {
    const { todo } = this.state;
    return (
      <div>
        <h2>Edit todo<Moment format='YY/MM/DD HH:mm'>{todo.id}</Moment></h2>
        <input
          type='checkbox'
          checked={todo.complete}
          onChange={() => this.onCompleteTodo(todo.id)} />
        <input
          type='text'
          ref='input'
          value={todo.text}
          palaceholder='Input todo'
          onChange={e => this.handleChange(e)}
        />
        <br />
        <button onClick={() => this.onUpdateTodo(todo.id, this.refs.input.value)}>Update</button>
        <button onClick={() => this.onDeleteTodo(todo.id)}>Delete</button>
      </div>
    );
  }

  onChangeState() {
    const { todos } = store.getState();
    this.setState({ todos }, () => {
      sessionStorage.setItem('todos', JSON.stringify(todos));
      this.props.history.push('/todos');
    });
  }

  onUpdateTodo(id, text) {
    action.updateTodo(id, text);
  }

  onCompleteTodo(id) {
    action.completeTodo(id);
  }

  onDeleteTodo(id) {
    action.deleteTodo(id);
  }
}

export default withRouter(TodoDetail);

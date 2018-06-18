import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

export default class TodoList extends Component {
  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      text: PropTypes.string,
      complete: PropTypes.bool
    })).isRequired,
    onClickDelete: PropTypes.func.isRequired,
    onClickCheckbox: PropTypes.func.isRequired
  };
  render() {
    return (
      <ul>{this.renderTodos()}</ul>
    );
  }
  renderTodos() {
    const { todos, onClickCheckbox, onClickDelete } = this.props;
    return todos.map(todo => (
      <Todo
        key={todo.id}
        onClickCheckbox={onClickCheckbox}
        onClickDelete={onClickDelete}
        { ...todo }
      />
    ));
  }
}

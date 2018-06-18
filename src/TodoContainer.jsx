import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TodoAdd from './TodoAdd';
import TodoList from './TodoList';

const TodoContainer = ({ match, todos, handleAddTodo, handleCompleteTodo, handleDeleteTodo }) => {
  return(
    <div>
      <TodoAdd onAddTodo={handleAddTodo} />
      <TodoList
        todos={todos}
        onClickCheckbox={handleCompleteTodo}
        onClickDelete={handleDeleteTodo} />
    </div>
  )
}

TodoContainer.propTypes = {
  handleAddTodo: PropTypes.func.isRequired,
  handleCompleteTodo: PropTypes.func.isRequired,
  handleDeleteTodo: PropTypes.func.isRequired,
}

export default TodoContainer;

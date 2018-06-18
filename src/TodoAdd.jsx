import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TodoAdd extends Component {
  static propTypes = {
    onAddTodo: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { onAddTodo } = this.props;
    return (
      <div>
        <input
          type='text'
          ref='input'
          placeholder='Input todo'
        />
        <button onClick={() => onAddTodo(this.refs.input.value)}>Add</button>
      </div>
    );
  }
}

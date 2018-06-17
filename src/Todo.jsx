import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Todo extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired,
    onClickCheckbox: PropTypes.func.isRequired,
    onClickDelete: PropTypes.func.isRequired
  };
  render() {
    const { text, complete } = this.props;
    return (
      <li>
        <label>
          <input
            type='checkbox'
            checked={complete}
            onChange={this.handleChange.bind(this)} />
          {text}
        </label>
        <button
          onClick={this.handleDelete.bind(this)}>
          Delete
        </button>
      </li>
    )
  }
  handleChange() {
    this.props.onClickCheckbox(this.props.id);
  }
  handleDelete() {
    if (!this.props.complete) {
      if (window.confirm("This todo is not completed. Are you sure delete it?")) {
        this.props.onClickDelete(this.props.id);
      }
    } else {
      this.props.onClickDelete(this.props.id);
    }
  }
}

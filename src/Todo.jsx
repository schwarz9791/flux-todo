import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import 'moment-timezone';

export default class Todo extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired,
    onClickCheckbox: PropTypes.func.isRequired,
    onClickDelete: PropTypes.func.isRequired
  };

  render() {
    const { id, text, complete, match } = this.props;
    return (
      <li>
        <label>
          <input
            type='checkbox'
            checked={complete}
            onChange={this.handleChange.bind(this)} />
          <Link to={`/todos/${id}`}>{text}</Link>
          <Moment format='YY/MM/DD HH:mm'>{id}</Moment>
        </label>
        <button
          onClick={this.handleDelete.bind(this)}>
          Delete
        </button>
      </li>
    );
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

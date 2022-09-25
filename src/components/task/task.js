import './task.css';
import { formatDistanceToNow } from 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';

class Task extends React.Component {
  static defaultProps = {
    onDeleted: () => {},
    onToggleDone: () => {},
  };

  static propTypes = {
    label: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    createTime: PropTypes.number.isRequired,
    onDeleted: PropTypes.func,
    onToggleDone: PropTypes.func,
  };

  render() {
    const { label, onDeleted, onToggleDone, completed, createTime } = this.props;

    let classNames = 'todo-list';
    if (completed) {
      classNames += ' completed';
    }

    return (
      <li className={classNames}>
        <div>
          <input className="toggle" type="checkbox" checked={completed} onChange={onToggleDone}></input>
          <label>
            <span className="title" onClick={onToggleDone}>
              {label}
            </span>
            <div className="timer">
                  <button className="icon-play"></button>
                  <button className="icon-pause"></button>
                  12:25
                </div>
            <span className="created">created {createdTime(createTime)} ago</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
      </li>
    );
  }
}
const createdTime = (time) => {
  return formatDistanceToNow(time, {
    includeSeconds: true,
  });
};

export default Task;

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
    let { minutes, seconds } = this.props;
    let classNames = 'todo-list';
    if (completed) {
      classNames += ' completed';
    }

    if (minutes < 10) {
      minutes = '0' + String(minutes);
    }

    if (seconds < 10) {
      seconds = '0' + String(seconds);
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
              <div className="timer-time">
                {minutes}:{seconds}
              </div>
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

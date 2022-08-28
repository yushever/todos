import "./task.css";
import { formatDistanceToNow } from "date-fns";
import React from "react";

class Task extends React.Component {
  render() {
    const { label, onDeleted, onToggleDone, completed, createTime } =
      this.props;

    let classNames = "todo-list";
    if (completed) {
      classNames += " completed";
    }

    return (
      <li className={classNames}>
        <div>
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={onToggleDone}
          ></input>
          <label>
            <span className="description" onClick={onToggleDone}>
              {label}
            </span>
            <span className="created">
              created {createdTime(createTime)} ago
            </span>
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

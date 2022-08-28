import React from "react";
import "./tasks-filter.css";

class TasksFilter extends React.Component {
  render() {
    const { onSelected, filter } = this.props;
    return (
      <ul className="filters">
        <li>
          <button
            onClick={() => onSelected("all")}
            className={filter === "all" ? "selected" : ""}
          >
            All
          </button>
        </li>
        <li>
          <button
            onClick={() => onSelected("active")}
            className={filter === "active" ? "selected" : ""}
          >
            Active
          </button>
        </li>
        <li>
          <button
            onClick={() => onSelected("completed")}
            className={filter === "completed" ? "selected" : ""}
          >
            Completed
          </button>
        </li>
      </ul>
    );
  }
}

export default TasksFilter;

import TasksFilter from "../tasks-filter";
import "./footer.css";
import React from "react";
import PropTypes from "prop-types";

class Footer extends React.Component {
  static defaultProps = {
    toDo: 0,
    onSelected: () => {},
    deleteCompletedItems: () => {},
  };

  static propTypes = {
    toDo: PropTypes.number,
    onSelected: PropTypes.func,
    deleteCompletedItems: PropTypes.func,
  };

  render() {
    const { toDo, filter, onSelected, deleteCompletedItems } = this.props;

    return (
      <div className="footer">
        <span className="todo-count">{toDo} items left</span>
        <div>
          <TasksFilter filter={filter} onSelected={onSelected} />
        </div>
        <button
          onClick={() => deleteCompletedItems()}
          className="clear-completed"
        >
          Clear completed
        </button>
      </div>
    );
  }
}
export default Footer;

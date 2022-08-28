import React from "react";
import "./new-task-form.css";

class NewTaskForm extends React.Component {
  state = {
    value: "",
  };

  handleChange(event) {
    this.setState(() => {
      return { value: event.target.value };
    });
  }

  render() {
    return (
      <input
        value={this.state.value}
        onChange={this.handleChange.bind(this)}
        className="new-todo"
        placeholder="What needs to be done?"
        onKeyDown={(event) => {
          if (
            event.key === "Enter" &&
            this.state.value.length > 0 &&
            !this.state.value.startsWith(" ")
          ) {
            this.props.onAdded(this.state.value);
            this.setState(() => {
              return { value: "" };
            });
          }
        }}
      />
    );
  }
}
export default NewTaskForm;

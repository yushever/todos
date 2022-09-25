import React from 'react';
import './new-task-form.css';

class NewTaskForm extends React.Component {
  state = {
    value: '',
  };

  handleChange(event) {
    this.setState(() => {
      return { value: event.target.value };
    });
  }

  render() {
    return (
      <form className="new-todo-form">
        <input
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
          className="new-todo"
          placeholder="What needs to be done?"
          onKeyDown={(event) => {
            if (event.key === 'Enter' && this.state.value.length > 0 && !this.state.value.startsWith(' ')) {
              this.props.onAdded(this.state.value);
              this.setState(() => {
                return { value: '' };
              });
            }
          }}
        />
        <input className="new-todo-form__timer" placeholder="Min"/>
        <input className="new-todo-form__timer" placeholder="Sec"/>
        </form>
        

    );
  }
}
export default NewTaskForm;

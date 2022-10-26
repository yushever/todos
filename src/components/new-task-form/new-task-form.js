import React from 'react';
import './new-task-form.css';

class NewTaskForm extends React.Component {
  state = {
    value: '',
    min: '',
    sec: '',
  };

  handleChange(event) {
    this.setState(() => {
      return { value: event.target.value };
    });
  }

  handleChangeMin(event) {
    if (event.target.value.length > 2) {
      alert('Слишком много минут!');
      return;
    }
    this.setState(() => {
      return { min: event.target.value };
    });
  }

  handleChangeSec(event) {
    if (event.target.value.length > 2) {
      alert('Слишком мало секунд!');
      return;
    }
    this.setState(() => {
      return { sec: event.target.value };
    });
  }

  onEnter(event) {
    if (event.key === 'Enter' && this.state.value.length > 0 && !this.state.value.startsWith(' ')) {
      this.props.onAdded(this.state.value, this.state.min, this.state.sec);
      this.setState(() => {
        return { value: '', min: '', sec: '' };
      });
    }
  }

  render() {
    return (
      <form className="new-todo-form">
        <input
          value={this.state.value}
          onChange={(e) => this.handleChange(e)}
          className="new-todo"
          placeholder="What needs to be done?"
          onKeyDown={(e) => this.onEnter(e)}
        />
        <input
          type="number"
          value={this.state.min}
          onChange={(e) => this.handleChangeMin(e)}
          className="new-todo-form__timer"
          placeholder="Min"
          onKeyDown={(e) => this.onEnter(e)}
        />
        <input
          type="number"
          value={this.state.sec}
          onChange={(e) => this.handleChangeSec(e)}
          className="new-todo-form__timer"
          placeholder="Sec"
          onKeyDown={(e) => this.onEnter(e)}
        />
      </form>
    );
  }
}
export default NewTaskForm;

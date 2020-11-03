import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import EventList from './EventList'
import EventForm from './EventForm'
import FormErrors from './FormErrors'
import validations from '../validations'

class Eventlite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: this.props.events,
      title: { value: "", valid: false },
      start_datetime: { value: "", valid: false },
      location: { value: "", valid: false },
      formValid: false,
      formErrors: {},
    };
  }

  handleInput = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    const newState = {};
    newState[name] = { ...this.state[name], value: value };
    this.setState(newState, () => this.validateField(name, value));
  };

  validateForm() {
    this.setState({
      formValid:
        this.state.title.valid &&
        this.state.location.valid &&
        this.state.start_datetime.valid,
    });
  }

  validateField(fieldName, fieldValue) {
    let fieldValid = true;
    let errors = [];
    let fieldError = '';
    switch (fieldName) {
      case "title":
        [fieldValid, fieldError] = validations.checkMinLength(fieldValue, 3);
        if (!fieldValid) {
          errors = errors.concat([fieldError]);
        }
        break;

      case "location":
        [fieldValid, fieldError] = validations.checkMinLength(fieldValue, 1)
        if (!fieldValid) {
          errors = errors.concat([fieldError]);
        }
        break;
      case "start_datetime":
        [fieldValid, fieldError] = validations.checkMinLength(fieldValue, 1);
        if (!fieldValid) {
          errors = errors.concat([fieldError]);
        }
        [fieldValid, fieldError] = validations.timeShouldBeInTheFuture(fieldValue);
        if (!fieldValid) {
          errors = errors.concat([fieldError]);
        }
        break;
    }
    const newState = {
      formErrors: { ...this.state.formErrors, [fieldName]: errors },
    };
    newState[fieldName] = { ...this.state[fieldName], valid: fieldValid };
    this.setState(newState, this.validateForm);
  }

  handleSubmit = (e) => {
    let newEvent = {
      title: this.state.title.value,
      start_datetime: this.state.start_datetime.value,
      location: this.state.location.value,
    };
    e.preventDefault();
    axios({
      method: "POST",
      url: "/events",
      data: {
        event: newEvent,
      },
      headers: {
        "X-CSRF-Token": document.querySelector("meta[name=csrf-token]").content,
      },
    })
      .then((response) => {
        this.addNewEvent(response.data);
        this.resetFormErrors();
      })
      .catch((error) => {
        this.setState({ formErrors: error.response.data });
      });
  };

  addNewEvent = (event) => {
    const events = [...this.state.events, event].sort(function (a, b) {
      return new Date(a.start_datetime) - new Date(b.start_datetime);
    });
    this.setState({ events: events });
  };

  resetFormErrors() {
    this.setState({ formErrors: {} });
  }

  render() {
    return (
      <div>
        <FormErrors formErrors={this.state.formErrors} />
        <EventForm
          handleSubmit={this.handleSubmit}
          handleInput={this.handleInput}
          title={this.state.title.value}
          start_datetime={this.state.start_datetime.value}
          location={this.state.location.value}
          formValid={this.state.formValid}
        />
        <EventList events={this.state.events} />
      </div>
    );
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('events_data')
  const data = JSON.parse(node.getAttribute('data'))
  ReactDOM.render(
    <Eventlite events={data} />,
    document.body.appendChild(document.createElement('div')),
  )
})
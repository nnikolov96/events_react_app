import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import EventList from './EventList'
import EventForm from './EventForm'
import FormErrors from './FormErrors'

class Eventlite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: this.props.events,
      title: { value: '', valid: false },
      start_datetime: { value: '', valid: false },
      location: { value: '', valid: false },
      formValid: false,
      formErrors: {}
    };
  }

  handleInput = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const newState = {};
    newState[name] = {...this.state[name], value: e.target.value};
    this.setState(newState, this.validateForm);
  };

  validateForm() {
    let formErrors = {}
    let formValid = true

    if(this.state.title.value.length <= 2) {
      formErrors.title = ["is too short (minimum is 3 characters)"];
      formValid = false;
    }

    if (this.state.location.value.length === 0) {
      formErrors.location = ["can't be blank"];
      formValid = false;
    }
    if (this.state.start_datetime.value.length === 0) {
      formErrors.start_datetime = ["can't be blank"];
      formValid = false;
    } else if (Date.parse(this.state.start_datetime.value) <= Date.now()) {
      formErrors.start_datetime = ["can't be in the past"];
      formValid = false;
    }

    this.setState({ formValid: formValid, formErrors: formErrors });
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
        event: newEvent
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
        this.setState({formErrors: error.response.data})
      });
  };

  addNewEvent = (event) => {
    const events = [...this.state.events, event].sort(function (a, b) {
      return new Date(a.start_datetime) - new Date(b.start_datetime);
    });
    this.setState({ events: events });
  };

  resetFormErrors() {
    this.setState({formErrors: {}})
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
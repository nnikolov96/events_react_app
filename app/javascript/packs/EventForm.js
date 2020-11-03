import React from 'react';

class EventForm extends React.Component {

  constructor(props) { 
    super(props)
    this.state = {
      title: '',
      start_datetime: '',
      location: ''
    }
  }

  render() { 
    return (
      <div>
        <h4>Create event: </h4>
        <form>
          <input type='text' name='title' placeholder='Title' value={this.state.title} />
          <input type='text' name='start_datetime' placeholder='Date' value={this.state.start_datetime} />
          <input type='text' name='location' placeholder='Location' value={this.state.location} />
          <button type='submit'>Create Event</button>
        </form>
      </div>
    );
  }
}

export default EventForm;
import React from 'react';

class EventForm extends React.Component { 
  render() { 
    return (
      <div>
        <h4>Create event: </h4>
        <form>
          <input type='text' name='title' placeholder='Title' />
          <input type='text' name='start_datetime' placeholder='Date' />
          <input type='text' name='location' placeholder='Location' />
          <button type='submit'>Create Event</button>
        </form>
      </div>
    );
  }
}

export default EventForm;
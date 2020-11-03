import React from 'react';
import Event from './Event';

const EventList = props => (
  <div>
    {props.events.map(function (event, i) {
      return (
        <Event key={i} event = {event}/>
      )
    })}
  </div>
)

export default EventList;
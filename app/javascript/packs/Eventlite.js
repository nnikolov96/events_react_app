import React from 'react'
import ReactDOM from 'react-dom'
import EventList from './EventList'
import EventForm from './EventForm'

const Eventlite = props => (
  <div>
    <EventForm />
    <EventList events={props.events} />
  </div>
)
document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('events_data')
  const data = JSON.parse(node.getAttribute('data'))
  ReactDOM.render(
    <Eventlite events={data} />,
    document.body.appendChild(document.createElement('div')),
  )
})
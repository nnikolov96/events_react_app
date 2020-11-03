import React from 'react'
import ReactDOM from 'react-dom'
import EventList from './EventList'

const Eventlite = props => (
  <div>
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
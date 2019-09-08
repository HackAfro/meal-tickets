import React from 'react';
import Ticket from '../components/Ticket';
import { GenerateButton } from '../components/Buttons';

export default function Generate({attendees}) {
  const attendeesWithNoOrInvalidTickets = hasInvalidTicket(attendees)
  return (
    <>
      <div className="search-wrapper-wp">
        <div className="search-wrapper">
          <a href="#search">
            <svg className="search">
              <use href="images/icons.svg#search"></use>
            </svg>
          </a>
          <input id="search" type="search" />
        </div>
      </div>
      <div className="main-wrapper">
        <h2 className="page-title">SEARCH RESULT</h2>
        <ul className="search-result">
          {attendeesWithNoOrInvalidTickets.map((attendee) => (
            <Ticket key={attendee.id} attendee={attendee}>
              <GenerateButton></GenerateButton>
            </Ticket>
          ))}
        </ul>
      </div>
    </>
  );
}

function hasInvalidTicket(attendees) {
  return attendees.filter(attendee => {
    const mealTickets = attendee.mealTickets.items;
    const invalidTickets = mealTickets.filter(ticket => !ticket.valid)
    if (invalidTickets.length > 0) {
      return true
    } else {
      return false
    }
  })
}

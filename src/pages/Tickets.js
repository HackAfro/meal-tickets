import React from 'react';
import Ticket from '../components/Ticket';
import { InvalidateButton } from '../components/Buttons';

export default function Tickets({attendees}) {
  const attendeesWithValidTickets = hasValidTicket(attendees)
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
          {attendeesWithValidTickets.map((attendee) => (
            <Ticket attendee={attendee} key={attendee.id}>
              <InvalidateButton></InvalidateButton>
            </Ticket>
          ))}
        </ul>
      </div>
    </>
  );
}

function hasValidTicket(attendees) {
  return attendees.filter(attendee => {
    const mealTickets = attendee.mealTickets.items;
    const validTickets = mealTickets.filter(ticket => ticket.valid)
    if (validTickets.length > 0) {
      return true
    } else {
      return false
    }
  })
}

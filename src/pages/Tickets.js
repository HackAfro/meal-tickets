import React from 'react';

// TODO - 1 define imports

import Ticket from '../components/Ticket';
import { InvalidateButton, BackButton } from '../components/Buttons';

// TODO - 2 define mutation query for invalidating tickets
const INVALIDATE_TICKET = ``;

const getValidTicket = (tickets) => {
  return tickets.find((ticket) => ticket.valid);
};

// TODO define onclick event handler for invalidating tickets
const onInvalidateClick = () => {
  
};

export default function Tickets({ attendees, search, searchTerm }) {
  // TODO - 3 call the useMutation hook with mutation string as an argument

  const attendeesWithValidTickets = hasValidTicket(attendees);
  return (
    <>
      <BackButton />
      <div className="search-wrapper-wp">
        <div className="search-wrapper">
          <a href="#search">
            <svg className="search">
              <use href="images/icons.svg#search"></use>
            </svg>
          </a>
          <input
            id="search"
            type="search"
            value={searchTerm}
            onChange={(e) => search(e.target.value)}
          />
        </div>
      </div>
      <div className="main-wrapper">
        <h2 className="page-title">SEARCH RESULT</h2>
        <ul className="search-result">
          {attendeesWithValidTickets.map((attendee) => (
            <Ticket attendee={attendee} key={attendee.id}>
              <InvalidateButton
              // TODO - 4 Add click listener to the button and define and event handler
                
              ></InvalidateButton>
            </Ticket>
          ))}
        </ul>
      </div>
    </>
  );
}

function hasValidTicket(attendees) {
  return attendees.filter((attendee) => {
    const mealTickets = attendee.mealTickets.items;
    const validTickets = mealTickets.filter((ticket) => ticket.valid);
    return validTickets.length > 0;
  });
}

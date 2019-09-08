import React from 'react';
import { Link } from 'react-router-dom';

export default function Index() {
  return (
    <>
      <div className="page-info">
        <img src="images/meal-ticket.svg" alt="" />
        <h1 className="img-title">meal ticket</h1>
        <p className="date">9th October 2019</p>
      </div>
      <ul className="options">
        <li className="option-item">
          <Link to="/generate">
            <img src="images/generate-mt.svg" alt="generate meal ticket" />
            <h2>Generate Meal Ticket</h2>
          </Link>
        </li>
        <li className="option-item">
          <Link to="/tickets">
            <img src="images/find-mt.svg" alt="Find Meal Ticket" />
            <h2>Find Meal Ticket</h2>
          </Link>
        </li>
      </ul>
    </>
  );
}

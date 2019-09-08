import React from 'react';
import { Route } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Index from './pages/Index';
import Generate from './pages/Generate';
import Tickets from './pages/Tickets';

import './App.css';

const GET_ATTENDIES = gql`
  query {
    attendeesList {
      count
      items {
        name
        id
        mealTickets {
          items {
            id
            valid
          }
        }
      }
    }
  }
`;

function App() {
  return (
    <section className="wrapper">
      <AppRouter></AppRouter>
    </section>
  );
}

function AppRouter() {
  const { loading, data } = useQuery(GET_ATTENDIES);
  return (
    <div>
      <Route path="/" exact component={Index} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Route
            path="/generate/"
            component={() => <Generate attendees={data.attendeesList.items} />}
          />
          <Route
            path="/tickets/"
            component={() => <Tickets attendees={data.attendeesList.items} />}
          />
        </>
      )}
    </div>
  );
}

export default App;

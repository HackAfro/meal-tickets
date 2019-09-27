import React, { useState, useContext } from 'react';
import { Route } from 'react-router-dom';
import { AuthContext } from '@8base/react-sdk';
import { withApollo } from 'react-apollo';

import { useQuery, useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Index from './pages/Index';
import Generate from './pages/Generate';
import Tickets from './pages/Tickets';

import Auth from './pages/Auth';
import './App.css';

const GET_ATTENDEES = gql`
  query Attendees($searchTerm: String!) {
    attendeesList(filter: { name: { contains: $searchTerm } }) {
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

const ATTENDEES_SUB = gql`
  subscription AttendeeSub {
    Attendees {
      node {
        mealTickets {
          items {
            id
            valid
          }
        }
        name
      }
      mutation
    }
  }
`;

function App() {
  const RouterApp = withApollo(AppRouter);
  return (
    <section className="wrapper">
      <RouterApp></RouterApp>
    </section>
  );
}

function AppRouter({ client }) {
  const [searchTerm, setSearchTerm] = useState('');
  const { isAuthorized, authClient } = useContext(AuthContext);
  const { loading, data } = useQuery(GET_ATTENDEES, {
    variables: { searchTerm },
  });
  const subscription = useSubscription(ATTENDEES_SUB);
  console.log(subscription);

  const logout = async () => {
    await client.clearStore();
    authClient.logout();
  };
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {isAuthorized && (
            <div className="logout-container">
              <button className="logout-button" onClick={logout}>
                <p>
                  Logout <span>→</span>
                </p>
              </button>
            </div>
          )}

          <Route path="/" exact component={Index} />
          <Route path="/auth/callback" component={Auth} />
          <Route
            path="/generate/"
            component={() => (
              <Generate
                attendees={data.attendeesList.items}
                search={setSearchTerm}
                searchTerm={searchTerm}
              />
            )}
          />
          <Route
            path="/tickets/"
            component={() => (
              <Tickets
                attendees={data.attendeesList.items}
                search={setSearchTerm}
                searchTerm={searchTerm}
              />
            )}
          />
        </>
      )}
    </div>
  );
}

export default App;

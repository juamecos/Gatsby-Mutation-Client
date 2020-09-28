import fetch from 'cross-fetch';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.DB_ENDPOINT,
    credentials: 'include',
    fetchOptions: {
      mode: 'cors',
    },
    fetch,
  }),
  cache: new InMemoryCache(),
});

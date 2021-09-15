import {ApolloClient, InMemoryCache} from '@apollo/client';

export const apolloClient = new ApolloClient({
  uri: `http://${process.env.NODE_ENV === 'production' ? 'host.docker.internal:8080' : 'localhost:8080'}/v1/graphql`,
  cache: new InMemoryCache(),
});

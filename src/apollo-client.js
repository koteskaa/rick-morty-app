import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'https://rickandmortyapi.com/graphql',
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          characters: {
            keyArgs: ["filter"],
            merge(existing = { results: [] }, incoming) {
              return {
                ...incoming,
                results: [...(existing.results || []), ...(incoming.results || [])],
              };
            },
          },
        },
      },
    },
  }),
});

export default apolloClient; 
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';
import Constants from 'expo-constants';
import { setContext } from '@apollo/client/link/context';

const cache = new InMemoryCache({
  typePolicies: {
    Repository: {
      fields: {
        reviews: relayStylePagination()
      }
    }
  }
});

const httpLink = createHttpLink({
  uri: Constants.manifest.extra.apolloUri
});

const createApolloClient = (authStorage) => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `bearer ${accessToken}` : ''
        }
      };
    } catch (e) {
      console.log(e);
      return {
        headers
      };
    }
  });
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache
  });
};

export default createApolloClient;

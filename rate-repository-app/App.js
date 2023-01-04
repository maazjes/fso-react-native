import Main from './src/Main';
import React from 'react';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from './src/utils/apolloClient';
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const App = () => {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    /* prettier-ignore */
    'Arial': require('./assets/fonts/arial.ttf')
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <AuthStorageContext.Provider value={authStorage}>
          <Main />
        </AuthStorageContext.Provider>
      </ApolloProvider>
    </NativeRouter>
  );
};

export default App;

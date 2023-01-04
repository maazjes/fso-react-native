import { StyleSheet, View } from 'react-native';
import RepositoryList from './components/RepositoryList';
import AppBar from './components/AppBar';
import { Route, Routes } from 'react-router-native';
import SignIn from './components/SignIn';
import { useApolloClient, useQuery } from '@apollo/client';
import useAuthStorage from './hooks/useAuthStorage';
import { GET_CURRENT_USER } from './graphql/queries';
import SingleRepository from './components/SingleRepository';
import ReviewForm from './components/ReviewForm';
import RegistrationForm from './components/RegistrationForm';
import MyReviews from './components/MyReviews';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1
  }
});

const Main = () => {
  const client = useApolloClient();
  const authStorage = useAuthStorage();
  const { loading, data } = useQuery(GET_CURRENT_USER);
  if (loading) {
    return null;
  }
  const logout = async () => {
    await authStorage.removeAccessToken();
    await client.resetStore();
  };
  const loginOrLogout =
    data?.me !== null
      ? [
          { name: 'Logout', link: '/signin', onPress: logout },
          { name: 'My reviews', link: '/myreviews' }
        ]
      : [
          { name: 'Signin', link: '/signin' },
          { name: 'Sign up', link: '/signup' }
        ];
  const links = [
    {
      name: 'Repositories',
      link: '/'
    },
    {
      name: 'Create a review',
      link: '/createreview'
    }
  ].concat(loginOrLogout);
  return (
    <View style={styles.container}>
      <AppBar links={links} />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/signin" element={<SignIn />} exact />
        <Route path="/createreview" element={<ReviewForm />} />
        <Route path="/:repositoryId" element={<SingleRepository />} />
        <Route path="/signup" element={<RegistrationForm />} />
        <Route path="/myreviews" element={<MyReviews />} />
      </Routes>
    </View>
  );
};

export default Main;

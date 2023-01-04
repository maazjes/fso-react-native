import { useMutation } from '@apollo/client';
import { LOGIN } from '../graphql/queries';
import { useNavigate } from 'react-router-native';
import { useApolloClient } from '@apollo/client';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const [login, result] = useMutation(LOGIN);
  const client = useApolloClient();
  const navigate = useNavigate();
  const signIn = async ({ username, password }) => {
    const { data } = await login({ variables: { username, password } });
    const token = data.authenticate.accessToken;
    await authStorage.setAccessToken(token);
    await client.resetStore();
    navigate('/');
    return data;
  };

  return [signIn, result];
};

export default useSignIn;

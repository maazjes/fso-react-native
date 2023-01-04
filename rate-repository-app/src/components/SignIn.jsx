import SignInForm from './SignInForm';
import useSignIn from '../hooks/useSignIn';

const SignIn = () => {
  const [signIn] = useSignIn();
  const onSubmit = async (values) => {
    await signIn({ username: values.username, password: values.password });
  };

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;

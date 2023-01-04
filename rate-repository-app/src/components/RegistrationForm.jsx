import FormikTextInput from './FormikTextInput';
import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import Button from './Button';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import { CREATE_USER } from '../graphql/queries';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  loginForm: {
    margin: 12
  }
});

const RegistrationForm = () => {
  const [createUser] = useMutation(CREATE_USER);
  const navigate = useNavigate();
  const [signIn] = useSignIn();
  const onSubmit = async ({ username, password }) => {
    try {
      await createUser({
        variables: { username, password }
      });
      await signIn({ username, password });
    } catch (e) {
      console.log(e);
    }
    navigate(`/`);
  };

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(1, 'Minimum length of username is 1')
      .max(30, 'Maximum length of username is 30')
      .required('Username is required'),
    password: yup
      .string()
      .min(5, 'Minimum length os password is 5')
      .max(50, 'Maximum length of password is 50')
      .required('Password is required'),
    passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
  });

  const initialValues = {
    username: '',
    password: '',
    passwordConfirmation: ''
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <View style={styles.loginForm}>
          <FormikTextInput name="username" placeholder="Username" />
          <FormikTextInput name="password" placeholder="Password" type="password" secureTextEntry={true} />
          <FormikTextInput name="passwordConfirmation" placeholder="Password confirmation" secureTextEntry={true} />
          <Button handleSubmit={handleSubmit} text="Register" />
        </View>
      )}
    </Formik>
  );
};

export default RegistrationForm;

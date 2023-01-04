import FormikTextInput from './FormikTextInput';
import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import Button from './Button';

const styles = StyleSheet.create({
  loginForm: {
    margin: 12
  }
});

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required')
});

const initialValues = {
  username: '',
  password: ''
};

const SignInForm = ({ onSubmit }) => {
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <View style={styles.loginForm}>
          <FormikTextInput name="username" placeholder="username" />
          <FormikTextInput name="password" placeholder="password" secureTextEntry={true} />
          <Button handleSubmit={handleSubmit} text="Login" />
        </View>
      )}
    </Formik>
  );
};

export default SignInForm;

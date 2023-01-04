import FormikTextInput from './FormikTextInput';
import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import Button from './Button';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import { CREATE_REVIEW, GET_CURRENT_USER } from '../graphql/queries';

const styles = StyleSheet.create({
  loginForm: {
    margin: 12
  }
});

const ReviewForm = () => {
  const [createReview] = useMutation(CREATE_REVIEW, { refetchQueries: [{ query: GET_CURRENT_USER }] });
  const navigate = useNavigate();
  const onSubmit = async ({ ownerName, rating, repositoryName, text }) => {
    try {
      const response = await createReview({
        variables: { ownerName, rating: parseInt(rating), repositoryName, text: text ? text : undefined }
      });
      navigate(`/${response.data.createReview.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };

  const validationSchema = yup.object().shape({
    ownerName: yup.string().required('Repository owner name is required'),
    repositoryName: yup.string().required('Repository name is required'),
    rating: yup.number().required('Rating is required').min(0, 'Minimum is 0').max(100, 'maximum is 100'),
    text: yup.string()
  });

  const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: ''
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <View style={styles.loginForm}>
          <FormikTextInput name="ownerName" placeholder="Repository owner name" />
          <FormikTextInput name="repositoryName" placeholder="Repository name" />
          <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
          <FormikTextInput name="text" placeholder="Review" />
          <Button handleSubmit={handleSubmit} text="Create a review" />
        </View>
      )}
    </Formik>
  );
};

export default ReviewForm;

import ReviewItem from './ReviewItem';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries';
import { ItemSeparator } from '../utils/itemSeparator';
import Button from './Button';
import { DELETE_REVIEW } from '../graphql/queries';

const styles = StyleSheet.create({
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10
  }
});

const MyReviews = () => {
  const { data, loading } = useQuery(GET_CURRENT_USER);
  const [deleteReview] = useMutation(DELETE_REVIEW, { refetchQueries: [{ query: GET_CURRENT_USER }] });
  const navigate = useNavigate();
  if (loading) {
    return null;
  }
  const reviews = data.me.reviews.edges.map((edge) => edge.node);
  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <View>
          <ReviewItem key={item.id} review={item} />
          <View style={styles.buttons}>
            <Button
              text="View repository"
              handleSubmit={() => {
                navigate(`/${item.repositoryId}`);
              }}
              style={{ backgroundColor: 'green', margin: 10, paddingLeft: 10, paddingRight: 10 }}
            />
            <Button
              text="Delete review"
              handleSubmit={() => {
                Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
                  {
                    text: 'Cancel',
                    onPress: () => null,
                    style: 'cancel'
                  },
                  {
                    text: 'Delete',
                    onPress: () => deleteReview({ variables: { deleteReviewId: item.id } }).catch((e) => console.log(e))
                  }
                ]);
              }}
              style={{ backgroundColor: 'red', margin: 10, paddingLeft: 10, paddingRight: 10 }}
            />
          </View>
        </View>
      )}
      keyExtractor={({ id }) => id}
    />
  );
};

export default MyReviews;

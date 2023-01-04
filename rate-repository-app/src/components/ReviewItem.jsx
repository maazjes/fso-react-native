import { View, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  reviewItem: {
    display: 'flex',
    flexDirection: 'row',
    margin: 20
  },
  reviewInfo: {
    flexDirection: 'column',
    flexShrink: 1
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#347deb',
    borderStyle: 'solid',
    marginRight: 20,
    justifyContent: 'center'
  },
  circleText: {
    textAlign: 'center'
  },
  createdAt: {
    color: '#969593',
    marginBottom: 5
  }
});

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.reviewItem}>
      <View style={styles.circle}>
        <Text style={styles.circleText} fontWeight="bold" color="textSecondary">
          {review.rating}
        </Text>
      </View>
      <View style={styles.reviewInfo}>
        <Text fontWeight="bold" color="textSecondary">
          {review.user.username}
        </Text>
        <Text style={styles.createdAt} fontWeight="bold" color="textSecondary">
          {review.createdAt.slice(0, 10)}
        </Text>
        <Text fontWeight="bold" color="textSecondary">
          {review.text}
        </Text>
      </View>
    </View>
  );
};

export default ReviewItem;

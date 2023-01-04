import { View, StyleSheet, Image, Dimensions } from 'react-native';
import Text from './Text';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    display: 'flex'
  },
  image: {
    width: width / 7,
    height: width / 7,
    margin: 15,
    borderRadius: 6
  },
  imageAndInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  info: {
    flexShrink: 1
  },
  language: {
    marginBottom: 5,
    marginTop: 5,
    padding: 5,
    backgroundColor: '#347deb',
    alignSelf: 'baseline',
    borderRadius: 6
  },
  stats: {
    marginTop: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  statItem: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  infoItem: {
    marginBottom: 5,
    marginTop: 5
  }
});

const RepositoryItem = ({ item }) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.imageAndInfo}>
        <Image source={{ uri: item.ownerAvatarUrl }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.infoItem} fontWeight="bold" color="textSecondary">
            {item.fullName}
          </Text>
          <Text style={styles.infoItem} color="textSecondary">
            {item.description}
          </Text>
          <Text style={styles.language}>{item.language}</Text>
        </View>
      </View>
      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text color="textSecondary" fontWeight="bold">
            {item.stargazersCount}
          </Text>
          <Text color="textSecondary">Stars</Text>
        </View>
        <View style={styles.statItem}>
          <Text color="textSecondary" fontWeight="bold">
            {item.forksCount}
          </Text>
          <Text color="textSecondary">Forks</Text>
        </View>
        <View style={styles.statItem}>
          <Text color="textSecondary" fontWeight="bold">
            {item.reviewCount}
          </Text>
          <Text color="textSecondary">Reviews</Text>
        </View>
        <View style={styles.statItem}>
          <Text color="textSecondary" fontWeight="bold">
            {item.ratingAverage}
          </Text>
          <Text color="textSecondary">Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;

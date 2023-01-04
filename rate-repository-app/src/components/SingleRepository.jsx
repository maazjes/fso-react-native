import RepositoryItem from './RepositoryItem';
import { View, StyleSheet, FlatList } from 'react-native';
import * as Linking from 'expo-linking';
import ReviewItem from './ReviewItem';
import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import { ItemSeparator } from '../utils/itemSeparator';
import Button from './Button';

const styles = StyleSheet.create({
  button: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5
  },
  singleRepository: {
    marginTop: 15,
    marginBottom: 10
  }
});

const RepositoryInfo = ({ repository }) => {
  return (
    <View style={styles.singleRepository}>
      <RepositoryItem item={repository} />
      <View style={styles.button}>
        <Button
          style={styles.button}
          text="Open in GitHub"
          handleSubmit={() => {
            Linking.openURL(repository.url);
          }}
        ></Button>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  let { repositoryId } = useParams();
  const { data, loading, fetchMore } = useRepository({ id: repositoryId, first: 3 });
  if (loading) {
    return null;
  }
  const onEndReach = () => {
    fetchMore();
  };
  const reviews = data.repository.reviews.edges.map((edge) => edge.node);
  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.1}
      renderItem={({ item }) => <ReviewItem key={item.id} review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={data.repository} />}
    />
  );
};

export default SingleRepository;

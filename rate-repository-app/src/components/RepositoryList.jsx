import RepositoryListContainer from './repositoryListContainer';
import { View, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
import { useNavigate } from 'react-router-native';
import theme from '../Theme';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  repositoryFilter: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 10,
    marginBottom: 10,
    backgroundColor: theme.colors.textGrey
  },
  search: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  }
});

const filterToArgs = (filter) => {
  if (filter === 'highestRated') {
    return { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' };
  }
  if (filter === 'lowestRated') {
    return { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };
  }
};

const RepositoryList = () => {
  const [filter, setFilter] = useState();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchKeywordDebounced] = useDebounce(searchKeyword, 500);
  const onChangeSearch = (query) => setSearchKeyword(query);
  const navigate = useNavigate();
  const variables = {
    ...(filter !== 'latest' ? filterToArgs(filter) : undefined),
    searchKeyword: searchKeywordDebounced,
    first: 8
  };
  const { data, loading, fetchMore } = useRepositories(variables);
  if (loading) {
    return null;
  }

  const filterPicker = () => (
    <Picker selectedValue={filter} onValueChange={(itemValue) => setFilter(itemValue)}>
      <Picker.Item label="Latest repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="highestRated" />
      <Picker.Item label="Lowest rated repositories" value="lowestRated" />
    </Picker>
  );

  const header = () => (
    <View style={styles.repositoryFilter}>
      <Searchbar style={styles.search} placeholder="Search" onChangeText={onChangeSearch} value={searchKeyword} />
      {filterPicker()}
    </View>
  );

  const nodes = data.repositories.edges.map((obj) => obj.node);

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer onEndReach={onEndReach} repositories={nodes} listHeader={header} navigate={navigate} />
  );
};

export default RepositoryList;

import React from 'react';
import { FlatList, View, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { ItemSeparator } from '../utils/itemSeparator';

class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const props = this.props;
    const header = props.listHeader;
    return header();
  };
  render() {
    return (
      <View>
        <FlatList
          ListHeaderComponent={this.renderHeader}
          onEndReached={this.props.onEndReach}
          onEndReachedThreshold={0.2}
          data={this.props.repositories}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                this.props.navigate(`/${item.id}`);
              }}
            >
              <RepositoryItem item={item} />
            </Pressable>
          )}
        />
      </View>
    );
  }
}

export default RepositoryListContainer;

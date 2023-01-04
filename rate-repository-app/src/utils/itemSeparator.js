import { View, StyleSheet } from 'react-native';
import theme from '../Theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.textGrey
  }
});

export const ItemSeparator = () => <View style={styles.separator} />;

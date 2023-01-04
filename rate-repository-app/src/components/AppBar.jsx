import { View, StyleSheet, ScrollView } from 'react-native';
import Text from './Text';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight * 2,
    paddingLeft: Constants.statusBarHeight / 2,
    backgroundColor: '#24292e',
    paddingBottom: Constants.statusBarHeight,
    flexDirection: 'row'
  },
  link: {
    marginLeft: 7,
    marginRight: 7
  }
});

const AppBar = ({ links }) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        {links.map((link) => (
          <Link key={link.name} to={link.link} onPress={link.onPress ? link.onPress : null}>
            <Text style={styles.link} color="colorPrimary" fontWeight="bold">
              {link.name}
            </Text>
          </Link>
        ))}
      </ScrollView>
    </View>
  );
};

export default AppBar;

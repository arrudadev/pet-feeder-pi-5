import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    paddingHorizontal: 20
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerTitle: {
    fontWeight: 'bold',
    fontSize: 50
  },

  content: {
    marginTop: 20,
  },

  listFeeds: {
    fontWeight: 'bold',
    fontSize: 30
  },

  flatList: {
    flex: 1,
  },

  containerFeed: {
    borderBottomWidth: 1,
    borderBottomColor: 'black'
  },
});
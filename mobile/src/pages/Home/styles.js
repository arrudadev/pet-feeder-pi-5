import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
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
    marginTop: 50,
  },

  lastFeed: {
    fontWeight: 'bold',
    fontSize: 30
  },

  updateLastFeed: {
    marginTop: 50,

    justifyContent: 'center',
    alignItems: 'center',

    width: '100%',
    height: 100,

    backgroundColor: '#1457ff',
    borderRadius: 50,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  updateLastFeedText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },

  giveFoodNowButton: {
    marginTop: 50,

    justifyContent: 'center',
    alignItems: 'center',

    width: '100%',
    height: 100,

    backgroundColor: '#00b803',
    borderRadius: 50,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  giveFoodNowText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold'
  }
});
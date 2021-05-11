import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',

    paddingHorizontal: 50
  },

  giveFoodNowButton: {
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
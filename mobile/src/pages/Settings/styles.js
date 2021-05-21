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
    fontSize: 22
  },

  addNewHour: {
    justifyContent: 'center',
    alignItems: 'center',
    
    height: 50,

    padding: 30,

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

  addNewHourText: {
    color: '#fff',
    fontWeight: 'bold'
  },

  containerHours: {    
    paddingHorizontal: 10
  },

  noDataFoundText: {
    fontWeight: 'bold',
    fontSize: 25,

    marginTop: 200
  },

  hour: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    borderBottomWidth: 1,
    borderBottomColor: 'gray',

    marginTop: 50
  },

  hourText: {
    fontWeight: 'bold',
    fontSize: 80,
  },

  hourIcons: {
    flexDirection: 'row',
  },

  icon: {
    marginHorizontal: 5
  }
});
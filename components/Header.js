import React from 'react';
import {View, TextInput, StyleSheet, Dimensions} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const screenWidth = Dimensions.get('window').width;

const Header = ({searchQuery, setSearchQuery, totalData, setTotalData, dataLength}) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput style={styles.searchInput} placeholder="Search by artist or song" value={searchQuery} onChangeText={(text) => setSearchQuery(text)} onSubmitEditing={() => {}} />
      <Picker style={styles.dropdown} selectedValue={totalData} onValueChange={(value) => setTotalData(value)}>
        <Picker.Item label="25" value="25" />
        <Picker.Item label="50" value="50" />
        <Picker.Item label="150" value="150" />
        <Picker.Item label="All Songs" value={dataLength.toString()} />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
  },
  searchInput: {
    fontSize: screenWidth * 0.04,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    flex: 3,
    backgroundColor: '#fff',
    marginRight: 10,
  },
  dropdown: {
    flex: 2,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default Header;

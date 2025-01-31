// Header.js
import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const Header = ({searchQuery, updateSearch}) => {
  return <TextInput style={styles.searchBar} placeholder="Search Artist or Song..." placeholderTextColor="#aaa" value={searchQuery} onChangeText={updateSearch} />;
};

const styles = StyleSheet.create({
  searchBar: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    color: '#333',
  },
});

export default Header;

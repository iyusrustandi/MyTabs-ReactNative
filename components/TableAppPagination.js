// Pagination.js
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const Pagination = ({filteredData, pageSize, currentPage, setCurrentPage}) => {
  const totalPages = Math.ceil(filteredData.length / pageSize);

  return (
    <View style={styles.paginationContainer}>
      <TouchableOpacity style={[styles.pageButton, currentPage === 1 && styles.disabledButton]} disabled={currentPage === 1} onPress={() => setCurrentPage(currentPage - 1)}>
        <Text style={styles.pageButtonText}>Previous</Text>
      </TouchableOpacity>
      <Text style={styles.paginationText}>Total Songs: {filteredData.length}</Text>
      <TouchableOpacity style={[styles.pageButton, currentPage === totalPages && styles.disabledButton]} disabled={currentPage === totalPages} onPress={() => setCurrentPage(currentPage + 1)}>
        <Text style={styles.pageButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  pageButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  pageButtonText: {
    color: '#fff',
  },
  paginationText: {
    alignSelf: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Pagination;

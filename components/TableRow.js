import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const TableRow = ({item, onOpenURL}) => {
  return (
    <View style={styles.tableRow}>
      <View style={styles.tableCellContainer}>
        <Text style={styles.tableCell}>{item.artist}</Text>
      </View>
      <View style={styles.tableCellContainer}>
        <Text style={styles.tableCell}>{item.song}</Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => onOpenURL(item.tabs)}>
          <View style={styles.tabsButtonContainer}>
            <Text style={styles.buttonText}>Tabs</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 4,
    borderRadius: 8,
  },
  tableCellContainer: {
    flex: 1,
  },
  tableCell: {
    fontSize: screenWidth * 0.03,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'left',
  },
  tabsButtonContainer: {
    alignSelf: 'center',
    marginHorizontal: 4,
    backgroundColor: 'rgba(0, 102, 204, 0.7)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: screenWidth * 0.03,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TableRow;

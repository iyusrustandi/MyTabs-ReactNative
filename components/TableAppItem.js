import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const Item = ({item, index, navigation, currentPage, pageSize}) => {
  const startIndex = (currentPage - 1) * pageSize;
  if (index < startIndex || index >= startIndex + pageSize) return null;

  return (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.artist}</Text>
      <Text style={styles.cell}>{item.song}</Text>
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() =>
          navigation.navigate('NewPage', {
            artist: item.artist,
            song: item.song,
            tabs: item.tabs,
            file: item.file,
          })
        }
      >
        <Text style={styles.linkText}>Tabs</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    backgroundColor: '#222',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 6,
  },
  cell: {
    flex: 1,
    textAlign: 'left',
    color: '#f5f5f5',
    fontSize: 16,
  },
  linkButton: {
    alignSelf: 'center',
    marginHorizontal: 4,
    backgroundColor: 'rgba(0, 102, 204, 0.7)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  linkText: {
    color: '#fff',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
});

export default Item;

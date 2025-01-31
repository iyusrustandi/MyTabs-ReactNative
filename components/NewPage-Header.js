import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const screenWidth = Dimensions.get('window').width;

const Header = ({url, onOpenInBrowser, onReload}) => {
  const navigation = useNavigation(); // Fix navigation usage

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={32} color="#fff" fontWeight="bold" />
      </TouchableOpacity>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer} style={styles.linkBox}>
        <TouchableOpacity onPress={onOpenInBrowser}>
          <Text style={styles.linkText}>{url}</Text>
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity onPress={onReload} style={styles.reloadButton}>
        <Text style={styles.buttonText}>Refresh</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#85929e',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  linkBox: {
    flex: 1,
    marginHorizontal: 8,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  linkText: {
    fontSize: screenWidth * 0.03,
    fontWeight: 'bold',
    color: '#fff',
  },
  reloadButton: {
    backgroundColor: '#0804f9',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: screenWidth * 0.03,
    color: '#fff',
    fontWeight: 'bold',
  },
  backButton: {
    marginLeft: 8,
  },
});

export default Header;

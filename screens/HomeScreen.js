import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import backgroundImg from '../assets/bg.png';
import iconImg from '../assets/icon.png';

const screenWidth = Dimensions.get('window').width;

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleNavigateToDataScreen = () => {
    navigation.navigate('DataScreen');
  };

  const handleNavigateToSettings = () => {
    navigation.navigate('SettingsScreen');
  };

  return (
    <ImageBackground source={backgroundImg} style={styles.backgroundImage}>
      <View style={styles.container}>
        {/* Ikon di atas tombol */}
        <Image source={iconImg} style={styles.iconImage} />

        {/* Tombol untuk menuju DataScreen */}
        <TouchableOpacity style={styles.button} onPress={handleNavigateToDataScreen}>
          <Text style={styles.buttonText}>Tabs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNavigateToSettings}>
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.versionText}>Version : 1.1.1</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#0804f9',
    paddingVertical: 16,
    paddingHorizontal: 64,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: screenWidth * 0.04,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 16,
    width: '100%',
    alignItems: 'center',
  },
  versionText: {
    fontSize: screenWidth * 0.025,
    textAlign: 'center',
    color: '#fff',
    position: 'absolute',
    bottom: 2,
    left: 0,
    right: 0,
  },
  iconImage: {
    width: 245,
    height: 245,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});

export default HomeScreen;

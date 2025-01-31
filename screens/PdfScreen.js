import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, TouchableOpacity, Text, StyleSheet, Dimensions, Linking, Alert} from 'react-native';
import WebView from 'react-native-webview';

const screenWidth = Dimensions.get('window').width;

const PdfScreen = ({route}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [webViewKey, setWebViewKey] = useState(1); // Key to force WebView reload
  const [shouldReload, setShouldReload] = useState(false);

  const url = route.params.url;
  const googleDocsUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(url)}`;

  const handleReload = () => {
    setIsLoading(true);
    setShouldReload(true);
  };

  const openInBrowser = () => {
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Failed to open in browser. Please check your internet connection.');
    });
  };

  useEffect(() => {
    if (shouldReload) {
      setWebViewKey(webViewKey + 1); // Increment the key to trigger WebView reload
      setShouldReload(false);
    }
  }, [shouldReload, webViewKey]);

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={openInBrowser} style={styles.linkBox}>
          <Text style={styles.linkText} numberOfLines={1}>
            {url}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleReload} style={styles.reloadButton}>
          <Text style={styles.buttonText}>Refresh</Text>
        </TouchableOpacity>
      </View>
      {isLoading && <ActivityIndicator style={styles.loadingIndicator} size="large" color="blue" />}
      <WebView
        key={webViewKey} // Use the key to force WebView reload
        source={{uri: googleDocsUrl}}
        style={{flex: 1, display: isLoading ? 'none' : 'flex'}}
        cacheEnabled={true}
        onLoad={() => {
          console.log('WebView Loaded');
          setIsLoading(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  linkBox: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    maxWidth: screenWidth * 0.7,
  },
  linkText: {
    fontSize: screenWidth * 0.03,
    color: '#333',
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
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -25}, {translateY: -25}],
  },
});

export default PdfScreen;

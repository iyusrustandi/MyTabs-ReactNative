import React, {useState, useCallback, useEffect} from 'react';
import {View, ActivityIndicator, TouchableOpacity, Text, StyleSheet, Dimensions, Linking, Alert} from 'react-native';
import WebView from 'react-native-webview';

const screenWidth = Dimensions.get('window').width;

const PdfScreen = ({route}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [webViewKey, setWebViewKey] = useState(1); // Key to force WebView reload
  const [shouldReload, setShouldReload] = useState(false);

  const googleDocsUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(route.params.url)}`;

  const handleReload = useCallback(() => {
    setIsLoading(true);
    setShouldReload(true);
  }, []);

  const openInBrowser = () => {
    Linking.openURL(route.params.url).catch(() => {
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
            {route.params.url}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleReload} style={styles.reloadButton}>
          <Text style={styles.buttonText}>Refresh</Text>
        </TouchableOpacity>
      </View>
      <WebView
        key={webViewKey} // Use the key to force WebView reload
        source={{uri: googleDocsUrl}}
        style={{flex: 1}}
        cacheEnabled={true}
        startInLoadingState={true}
        renderLoading={() => <ActivityIndicator style={{flex: 1}} size="large" color="blue" />}
        onError={(error) => {
          console.error('WebView Error:', error);
          Alert.alert('Error', 'Failed to load PDF. Please check your internet connection.', [{text: 'Reload', onPress: () => setShouldReload(true)}]);
        }}
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
});

export default PdfScreen;

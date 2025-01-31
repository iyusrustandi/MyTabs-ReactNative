import React, {useState, useRef} from 'react';
import {View, ActivityIndicator, Alert, StyleSheet, Dimensions, Linking} from 'react-native';
import {WebView} from 'react-native-webview';
import Header from '../components/NewPage-Header';

const screenWidth = Dimensions.get('window').width;

const NewPage = ({route}) => {
  const {url} = route.params;
  const webviewRef = useRef(null); // Create a ref for the WebView

  const [isLoading, setIsLoading] = useState(true);

  const openInBrowser = () => {
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Failed to open in browser. Please check your internet connection.');
    });
  };

  const handleReload = () => {
    setIsLoading(true);
    webviewRef.current.reload();
  };

  return (
    <View style={{flex: 1}}>
      <Header url={url} onOpenInBrowser={openInBrowser} onReload={handleReload} />
      {isLoading && <ActivityIndicator style={styles.loadingIndicator} size="large" color="blue" />}
      <WebView
        ref={webviewRef}
        source={{uri: url}}
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
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -25}, {translateY: -25}],
  },
});

export default NewPage;

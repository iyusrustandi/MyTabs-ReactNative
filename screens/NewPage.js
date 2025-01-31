// screens/NewPage.js
import React from 'react';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

const TabsWebView = ({route}) => {
  const {artist, song, tabs, file} = route.params;

  const tabsUrl = `https://gtabs.vercel.app/tabs-layout.html?artist=${encodeURIComponent(artist)}&song=${encodeURIComponent(song)}&tabs=${encodeURIComponent(tabs)}&file=${encodeURIComponent(file)}`;

  return <WebView source={{uri: tabsUrl}} style={styles.container} />;
};

export default TabsWebView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

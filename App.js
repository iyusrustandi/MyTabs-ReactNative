import React, {useEffect} from 'react';
import {StyleSheet, View, SafeAreaView, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DataScreen from './screens/TableApp';
import NewPage from './screens/NewPage';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/Settings';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    StatusBar.setHidden(false);
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="HomeScreen">
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}} />
            <Stack.Screen name="DataScreen" component={DataScreen} options={{headerShown: false}} />
            <Stack.Screen name="NewPage" component={NewPage} options={{headerShown: false}} />
            <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{headerShown: false}} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

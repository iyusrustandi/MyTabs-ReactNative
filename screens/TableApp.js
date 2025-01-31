// screens/TableApp.js
import React, {useState, useEffect, useRef} from 'react';
import {View, FlatList, ActivityIndicator, ImageBackground, Animated, StyleSheet} from 'react-native';
import Header from '../components/TableAppHeader';
import Item from '../components/TableAppItem';
import Pagination from '../components/TableAppPagination';

const IndexScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageSize, setPageSize] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();

    fetch('https://gtabs.vercel.app/api/data.json')
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setFilteredData(json);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  const updateSearch = (query) => {
    setSearchQuery(query);
    const filtered = data.filter((item) => item.artist.toLowerCase().includes(query.toLowerCase()) || item.song.toLowerCase().includes(query.toLowerCase()));
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <ImageBackground source={require('../assets/bg.png')} style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Animated.Image source={require('../assets/loading.png')} style={[styles.loadingImage, {transform: [{rotate: spin}]}]} />
          <ActivityIndicator size="large" color="#ffffff" style={styles.loadingIndicator} />
        </View>
      ) : (
        <>
          <Header searchQuery={searchQuery} updateSearch={updateSearch} />
          <FlatList data={filteredData} keyExtractor={(item, index) => index.toString()} renderItem={({item, index}) => <Item item={item} index={index} navigation={navigation} currentPage={currentPage} pageSize={pageSize} />} />
          <Pagination filteredData={filteredData} pageSize={pageSize} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    resizeMode: 'cover',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  loadingIndicator: {
    position: 'absolute',
    bottom: -20,
  },
});

export default IndexScreen;

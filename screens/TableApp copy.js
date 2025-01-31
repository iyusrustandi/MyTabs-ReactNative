import React, {useState, useEffect} from 'react';
import {View, ImageBackground, Text, StyleSheet, Dimensions, FlatList} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import backgroundImg from '../assets/bg.png';
import Header from '../components/Header';
import TableRow from '../components/TableRow';

const screenWidth = Dimensions.get('window').width;

const TableApp = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [totalData, setTotalData] = useState(25);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // const response = await axios.get('https://gtabs.vercel.app/data.json');
      const response = await axios.get('https://gtabs.vercel.app/layout2/api/data.json');
      setData(response.data);
      searchData();
    } catch (error) {
      console.error(error);
    }
  };

  const searchData = () => {
    const filteredData = data.filter((item) => item.artist.toLowerCase().includes(searchQuery.toLowerCase()) || item.song.toLowerCase().includes(searchQuery.toLowerCase()));
    setSearchResults(totalData === 'allsongs' ? filteredData : filteredData.slice(0, parseInt(totalData)));
    if (filteredData.length === 0 && searchQuery.trim() !== '') {
      setErrorMessage('No results found');
    } else {
      setErrorMessage('');
    }
  };

  useEffect(() => {
    searchData();
  }, [searchQuery, totalData]);

  const handleOpenURL = (url) => {
    console.log('Opening URL:', url);
    navigation.navigate('NewPage', {url});
  };

  return (
    <ImageBackground source={backgroundImg} style={styles.backgroundImage}>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} totalData={totalData} setTotalData={setTotalData} dataLength={data.length} />
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      <View style={styles.tableContainer}>
        <FlatList
          data={searchQuery !== '' ? searchResults : data.slice(0, parseInt(totalData))}
          renderItem={({item}) => <TableRow item={item} onOpenURL={handleOpenURL} />}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={<Text style={styles.noDataText}>No Data Available</Text>}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
      <View style={styles.totalTextBackground}>
        <Text style={styles.totalText}>Total Song: {data.length}</Text>
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
  tableContainer: {
    flex: 1,
    maxHeight: 1000,
    paddingHorizontal: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    elevation: 5,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: -2},
    marginTop: 16,
  },
  flatListContent: {
    paddingBottom: 16,
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    fontSize: screenWidth * 0.04,
    marginVertical: 8,
  },
  noDataText: {
    textAlign: 'center',
    color: '#666',
    fontSize: screenWidth * 0.04,
    marginVertical: 20,
  },
  totalTextBackground: {
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  totalText: {
    fontSize: screenWidth * 0.03,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
});

export default TableApp;

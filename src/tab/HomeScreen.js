import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  StatusBar,
  Switch,
} from 'react-native';
import axios from 'axios';
import {CustomHeader} from '../index';
import {SliderBox} from 'react-native-image-slider-box';
import {IMAGE} from '../constant/Image';
export class HomeScreen extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      images: [
        IMAGE.IMAGE_SLIDE_1,
        IMAGE.IMAGE_SLIDE_2,
        IMAGE.IMAGE_SLIDE_3,
        IMAGE.IMAGE_SLIDE_4,
      ],
      itemInSlide: [1, 2, 3, 4],
      data: [],
      start: 0,
      end: 6,
      switchValue: false,
    };
  }
  componentDidMount() {
    this.setState({isLoading: true}, this.getData);
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  toggleSwitch = (value) => {
    //onValueChange of the switch this function will be called
    this.setState({switchValue: value});
    //state changes according to switch
    //which will result in re-render the text
  };
  getData = async () => {
    const url =
      'http://localhost:8888/api/select_api.php?start=' +
      this.state.start +
      '&end=' +
      this.state.end;
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: this.state.data.concat(responseJson),
          isLoading: false,
        });
      });
  };
  renderRow = ({item}) => {
    return (
      <View style={styles.product_card}>
        <TouchableOpacity
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate('HomeDetail', {
              itemId: item.product_id,
            });
          }}>
          <Image source={IMAGE[item.img]} style={styles.itemImage} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('HomeDetail', {
              itemId: item.product_id,
            })
          }>
          <Text style={styles.itemText}>ชื่อสินค้า:{item.product_name}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('HomeDetail')}>
          <Text style={styles.itemText}>ราคา:{item.price}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderFooter = () => {
    return this.state.isLoading ? (
      <SafeAreaView style={styles.loader}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    ) : null;
  };

  handleLoadMore = () => {
    this.setState({start: this.state.start + 6}, this.getData);
  };
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <CustomHeader
          title="Home"
          isHome={true}
          navigation={this.props.navigation}
        />
        <SliderBox
          images={this.state.images}
          onCurrentImagePressed={(index) =>
            this.props.navigation.navigate('HomeDetail', {
              itemId: this.state.itemInSlide[index],
            })
          }
          // currentImageEmitter={index => console.warn(`current pos is: ${index}`)}
          autoplay={true}
          circleLoop={true}
          imageLoadingColor={'black'}
        />
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              alignSelf: 'center',
              marginTop: 10,
            }}>
            ผลิตภัณฑ์แนะนำ
          </Text>
        </View>
        <FlatList
          style={styles.container}
          data={this.state.data}
          keyExtractor={(item, index) => String(index)}
          renderItem={this.renderRow}
          onEndReached={this.handleLoadMore}
          numColumns={2}
          // onEndReachedThreshold={0}
          // ListFooterComponent = {this.renderFooter}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    backgroundColor: '#FFF',
  },
  product_card: {
    flex: 1,
    marginRight: 10,
    marginLeft: 10,
    marginVertical: 0,
    backgroundColor: '#FFF',
  },
  item: {
    borderBottomColor: '#ccc',
    marginBottom: 10,
    borderBottomWidth: 1,
  },
  itemImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  itemText: {
    fontSize: 20,
    padding: 5,
  },
  loader: {
    marginTop: 10,
    alignItems: 'center',
  },
});

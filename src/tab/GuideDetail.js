import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  StatusBar,
  Switch,
  TextInput,
} from 'react-native';
import axios from 'axios';
import {CustomHeader} from '../index';
import {SliderBox} from 'react-native-image-slider-box';
import {IMAGE} from '../constant/Image';
export class GuideDetail extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isPress:true,
      data: [],
      start: 0,
      end: 6,
      recommendItems: [],
      text: '',
      name: '',
      id: ''
    };
  }
  componentDidMount() {
    const {text} = this.props.route.params;
    this.setState({text: text});
    this.setState({isLoading: true}, this.getData);
  }
  

  getData = async () => {
    const url =
      'http://172.20.10.3/api/guide_api.php?text=' + this.state.text;
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson,
        });
        this.setState({
          id: this.state.data[0][0]
        });
      });
  };
  getRecommendData = async () => {
    const problemId = this.state.id;
    const url = 'http://172.20.10.3/api/recommend_api.php?id='+problemId+'&start='+this.state.start+'&end='+this.state.end;
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          recommendItems: this.state.recommendItems.concat(responseJson),
          isLoading: false,
          isPress: false,
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
    this.setState({start: this.state.start + 6}, this.getRecommendData);
  };
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <CustomHeader
          title="Guide"
          navigation={this.props.navigation}
        />
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 17,
              alignSelf: 'center',
              marginTop: 10,
              marginLeft: 10,
              marginRight: 10,
              backgroundColor: 'white',
            }}>
            {this.state.data.map((data,index) => (
              <Text key={index} >{data.treatment}</Text>
            ))}
          </Text>
        </View>
        { this.state.isPress ?<TouchableHighlight
          onPress={() =>
            this.getRecommendData()
          }
          style={{alignSelf:'center',marginTop:10}}
          onLongPress={this._onLongPressButton}
          underlayColor="white">
          <View style={styles.button2}>
              <Text style={styles.buttonText}>แสดงสินค้าที่ทางไกด์แนะนำ</Text>
          </View>
        </TouchableHighlight>: null }
        
        <FlatList
          style={styles.container}
          data={this.state.recommendItems}
          keyExtractor={(item, index) => index.toString}
          renderItem={this.renderRow}
          numColumns={2}
          onEndReached={this.handleLoadMore}
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
  button2: {
    width: "60%",
    height: 25,
    alignItems: 'center',
    borderColor: 'white',
    borderWidth:1,
    borderStyle:'solid',
    backgroundColor: '#b2c4c8',
  },
});

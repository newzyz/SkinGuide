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
  TouchableHighlight,
  Alert,
} from 'react-native';
import {CustomHeader} from '../index';
import {IMAGE} from '../constant/Image';
export class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      sLoading: false,
    };
  }
  componentDidMount() {
    this.setState({isLoading: true}, this.getData);
  }
  getData = async () => {
    const url = 'http://localhost:8888/api/basket_api.php';
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: this.state.data.concat(responseJson),
          isLoading: false,
        });
      });
  };
  delete(itemId) {
    fetch('http://localhost:8888/api/delete_api.php?id=' + itemId)
      .then((item) => item.json())
      .then((item) => {
        Alert.alert('sussess');
      });
  }

  renderRow = ({item}) => {
    return (
      <View style={styles.product_card}>
        <Image source={IMAGE[item.img]} style={styles.itemImage} />
        <Text style={styles.itemText}>รายการสั่งซื้อ:{item.idbasket}</Text>
        <Text style={styles.itemText}>ชื่อสินค้า:{item.product_name}</Text>
        <Text style={styles.itemText}>ราคา:{item.price}</Text>
        <Text style={styles.itemText}>จำนวน:{item.amount}</Text>
        <TouchableHighlight
          underlayColor="white"
          onPress={() => this.delete(item.idbasket)}>
          <View style={styles.button}>
            <Text style={styles.text2}>X</Text>
          </View>
        </TouchableHighlight>
        <Text>---------------------------------------------------------</Text>
      </View>
    );
  };
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <CustomHeader
          title="basket"
          isHome={true}
          navigation={this.props.navigation}
        />
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text>รายการสินค้า</Text>
        </View>
        <FlatList
          data={this.state.data}
          keyExtractor={(item, index) => String(index)}
          renderItem={this.renderRow}
          numColumns={1}
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
    marginVertical: 5,
    backgroundColor: '#FFF',
  },
  product_card: {
    flex: 1,
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: '#FFF',
  },
  item: {
    borderBottomColor: '#ccc',
    marginBottom: 10,
    borderBottomWidth: 1,
  },
  itemImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  itemText: {
    fontSize: 20,
    padding: 0,
  },
  loader: {
    marginTop: 10,
    alignItems: 'center',
  },
  basketContainerStyle: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#e2e2e2',
    backgroundColor: '#DCDCDC',
  },
  bagsTextStyle: {
    fontSize: 12,
  },
  priceTextStyle: {
    fontSize: 12,
  },
  button: {
    width: 25,
    height: 25,
    alignItems: 'center',
    backgroundColor: 'red',
    marginLeft: 330,
  },
  text2: {
    color: 'white',
    fontSize: 17,
  },
});

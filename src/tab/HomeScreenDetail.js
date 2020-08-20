import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Button,
  TouchableHighlight,
} from 'react-native';
import {CustomHeader} from '../index';
import Blink from '../components/Blink';
import {IMAGE} from '../constant/Image';
export class HomeScreenDetail extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <CustomHeader
          title="Product detail"
          navigation={this.props.navigation}
        />
        <View style={{width: 520, height: 50}}>
          <Image
            style={{
              width: 350,
              height: 350,
              marginLeft: 30,
            }}
            source={IMAGE.IMAGE_DETAIL}></Image>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-start',
            marginLeft: 20,
            marginTop: 20,
          }}>
          <SafeAreaView style={{flexDirection: 'row'}}>
            <SafeAreaView>
              <Text style={{color: '#EE2C2C', fontSize: 35}}>฿3,510 </Text>
            </SafeAreaView>
            <SafeAreaView style={{justifyContent: 'flex-end'}}>
              <Text
                style={{
                  color: 'gray',
                  fontSize: 25,
                  textDecorationLine: 'line-through',
                }}>
                ฿3,900
              </Text>
            </SafeAreaView>
            <SafeAreaView style={{justifyContent: 'center'}}>
              <Text style={styles.button}>10%off</Text>
            </SafeAreaView>
          </SafeAreaView>
          <SafeAreaView style={{flexDirection: 'row'}}>
            <SafeAreaView
              style={{
                flex: 1,
                justifyContent: 'center',
              }}>
              <Text>
                <Blink text="Hot!" />
              </Text>
            </SafeAreaView>
            <SafeAreaView style={{flex: 9}}>
              <Text style={styles.text}>
                ครีมบำรุงผิว Vital Perfection Uplifting and Firming Cream
                Enriched ปริมาณ 50 มล.
              </Text>
            </SafeAreaView>
          </SafeAreaView>
          <SafeAreaView
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              justifyContent: 'space-between',
            }}>
            <SafeAreaView>
              <TouchableHighlight
                onPress={() =>
                  this._onPressButton(this.state.email, this.state.password)
                }
                onLongPress={this._onLongPressButton}
                underlayColor="white">
                <View style={styles.button2}>
                  <Text style={styles.buttonText}>เพิ่มใส่ตะกล้า</Text>
                </View>
              </TouchableHighlight>
            </SafeAreaView>
            <SafeAreaView>
              <TouchableHighlight
                onPress={() =>
                  this._onPressButton(this.state.email, this.state.password)
                }
                onLongPress={this._onLongPressButton}
                underlayColor="white">
                <View style={styles.button2}>
                  <Text style={styles.buttonText}>ซื้อทันที</Text>
                </View>
              </TouchableHighlight>
            </SafeAreaView>
          </SafeAreaView>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    width: 520,
    height: 280,
    marginLeft: -50,
    flex: 3,
  },
  loginScreenButton: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#1E6738',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  loginText: {
    color: '#fff',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  container1: {
    alignItems: 'center',
    backgroundColor: 'gray',
    width: 420,
    height: 50,
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  button: {
    width: 55,
    height: 20,
    marginTop: 10,
    fontSize: 16,
    alignItems: 'center',
    backgroundColor: 'orange',
    color: 'white',
  },
  button2: {
    width: 150,
    height: 25,
    alignItems: 'center',
    marginLeft: 20,
    backgroundColor: '#b2c4c8',
  },
  button1: {
    width: 50,
    height: 20,
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: 'red',
    color: 'white',
  },
  input: {
    marginTop: -5,
    margin: 15,
    height: 40,
    width: 250,
    borderColor: 'black',
    borderWidth: 1,
  },
  text: {
    marginLeft: 10,
    margin: 15,
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text2: {
    color: 'black',
    fontSize: 9,
  },
});

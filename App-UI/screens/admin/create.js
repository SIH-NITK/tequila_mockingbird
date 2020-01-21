import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, Image, TouchableOpacity, TouchableHighlight, ScorllView } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import customerLaundryDetails from '../../_services/customer-laundry-details';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-root-toast';
class Create extends React.Component {
  customerLaundryData = {};
  constructor(props) {
    super(props);
    this.state = {
      shirtQty: 0,
      trouserQty: 0,
      tshirtQty: 0,
      towelQty: 0,
      bedSheetQty: 0,
      customerKey: "",
      spinner: false,
      toast: false
    }
    this.state.customerKey = this.props.screenProps.customerKey;
  }

  render() {




    const { shirtQty } = this.state.shirtQty;
    const { trouserQty } = this.state.trouserQty;
    const { tshirtQty } = this.state.tshirtQty;
    const { towelQty } = this.state.towelQty;
    const { bedSheetQty } = this.state.bedSheetQty;

    var userLaundry = {
      quantity: {
        shirt: this.state.shirtQty,
        trouser: this.state.trouserQty,
        tshirt: this.state.tshirtQty,
        towel: this.state.towelQty,
        bedSheet: this.state.bedSheetQty
      },
      key: this.state.customerKey
    }
    addCustomerLaundry = () => {
      if (this.state.customerKey != "") {
        this.setState({ spinner: true })
        customerLaundryDetails.postCustomerLaundry(userLaundry).then((res) => {
          this.setState({toastMessage:"Laundry is Successfully Added"})
          this.setState({ spinner: false });
          this.setState({ toast: true });
          setTimeout(() => this.setState({
            toast: false
          }), 2000); // hide toast after 5s
        }).catch((e) => {
          console.log(e);
        });
      }
      else {
        this.setState({toastMessage:"Please Select Block and Room Number"})
        this.setState({ toast: true });
        setTimeout(() => this.setState({
          toast: false
        }), 2000); // hide toast after 5s
      }
    }

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.elements}>
            <Text>Shirt</Text>
            <NumericInput
              value={shirtQty}
              onChange={shirtQty => this.setState({
                shirtQty
              })}
              onLimitReached={(isMax, msg) => console.log(isMax, msg)}
              totalWidth={100}
              totalHeight={40}
              iconSize={25}
              step={1}
              valueType='real'
              rounded
              textColor='#000000'
              iconStyle={{ color: 'white' }}
              rightButtonBackgroundColor='black'
              leftButtonBackgroundColor='black' />
          </View>
          <View style={styles.elements}>
            <Text>Trouser</Text>
            <NumericInput
              value={trouserQty}
              onChange={trouserQty => this.setState({
                trouserQty
              })}
              onLimitReached={(isMax, msg) => console.log(isMax, msg)}
              totalWidth={100}
              totalHeight={40}
              iconSize={25}
              step={1}
              valueType='real'
              rounded
              textColor='#000000'
              iconStyle={{ color: 'white' }}
              rightButtonBackgroundColor='black'
              leftButtonBackgroundColor='black' />
          </View>
          <View style={styles.elements}>
            <Text>T-Shirt</Text>
            <NumericInput
              value={tshirtQty}
              onChange={tshirtQty => this.setState({
                tshirtQty
              })}
              onLimitReached={(isMax, msg) => console.log(isMax, msg)}
              totalWidth={100}
              totalHeight={40}
              iconSize={25}
              step={1}
              valueType='real'
              rounded
              textColor='#000000'
              iconStyle={{ color: 'white' }}
              rightButtonBackgroundColor='black'
              leftButtonBackgroundColor='black' />
          </View>

          <View style={styles.elements}>
            <Text>Towel</Text>
            <NumericInput
              value={towelQty}
              onChange={towelQty => this.setState({
                towelQty
              })}
              onLimitReached={(isMax, msg) => console.log(isMax, msg)}
              totalWidth={100}
              totalHeight={40}
              iconSize={25}
              step={1}
              valueType='real'
              rounded
              textColor='#000000'
              iconStyle={{ color: 'white' }}
              rightButtonBackgroundColor='black'
              leftButtonBackgroundColor='black' />
          </View>

          <View style={styles.elements}>
            <Text>BedSheet</Text>
            <NumericInput
              value={bedSheetQty}
              onChange={bedSheetQty => this.setState({
                bedSheetQty
              })}
              onLimitReached={(isMax, msg) => console.log(isMax, msg)}
              totalWidth={100}
              totalHeight={40}
              iconSize={25}
              step={1}
              valueType='real'
              rounded
              textColor='#000000'
              iconStyle={{ color: 'white' }}
              rightButtonBackgroundColor='black'
              leftButtonBackgroundColor='black' />
          </View>
          <View style={styles.Btn}>
            <TouchableHighlight style={styles.endBtn} onPress={() => {
              addCustomerLaundry();
            }}>
              <Text style={styles.text}>Add</Text>
            </TouchableHighlight>
            <Spinner
              visible={this.state.spinner}
              textContent={''}
              textStyle={styles.spinnerTextStyle}
              color="black"
              size="large"
            />
            <Toast
              visible={this.state.toast}
              position={50}
              shadow={false}
              animation={false}
              hideOnPress={true}
            >{this.state.toastMessage}</Toast>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#000000",
    height: 200,
  },

  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: '600',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600"
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#000000",
  },
  elements: {
    flexDirection: 'row',
    justifyContent: "space-between",
    margin: 20,
  },

  Btn: {
    padding: 10,
    marginTop: 10,
  },
  endBtn: {
    alignItems: "center",
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: 'black',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff'
  },
  container: {
    margin: 10,
    padding: 5,
    flex: 1,
  },
  text: {
    color: '#DDD'
  }
});
export default Create;

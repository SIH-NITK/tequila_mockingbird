import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, Image, TouchableOpacity } from 'react-native';
import Current from '../../components/current';
import customerLaundryDetails from '../../_services/customer-laundry-details';

class currentLaundryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerKey: "",
      currentLaundry: [],
      prop: {},
      flag: false
    }

    try {
      console.log("customer")
      this.state.customerKey = this.props.navigation.state.params.customerData.key;
      this.state.currentLaundry = this.props.navigation.state.params.current;
      this.state.prop = this.props.navigation.state.params;
      this.state.flag=true;

    } catch{
      console.log("admin")
      this.setState({ flag: false })
      this.state.customerKey = this.props.screenProps.customerKey;
      this.state.currentLaundry = this.props.screenProps.result.current;
      this.state.flag=false;
    }

  }
  updateStateOnPayment = (result) => {
    try {
      // this.state.customerKey = this.props.navigation.state.params.customerData.key;
      this.state.currentLaundry = result.current;
      this.setState({ currentLaundry: result.current });
      this.props.navigation.state.params = result;
    }
    catch (e) {
      console.log(e);
      console.log("catch here")
    }

  }

  renderListofCurrentComponents() {
    return (
      this.state.currentLaundry.map((data) => {
        return (
          <Current updateState={this.updateStateOnPayment} screenProps={{ key: this.state.customerKey, data: data, flag: this.state.flag }} />
        )
      })
    )
  }

  render() {
    if (this.state.currentLaundry && this.state.currentLaundry.length) {
      return (

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ width: '100%', alignItems: 'center', flexGrow: 1, paddingBottom: 40 }}>
          <View>{this.renderListofCurrentComponents()}</View>
        </ScrollView>

      )

    }

    else {
      return (
        <View>
          <Text style={styles.textStyle}>
            No laundry here
          </Text>
        </View>
      );
    }

  }
}

const styles = StyleSheet.create({
  textStyle: {
    fontWeight: 'bold',
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: 100,
    lineHeight: 150
  },
})


export default currentLaundryScreen;


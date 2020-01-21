import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, Image, TouchableOpacity } from 'react-native';
import HistoryCards from '../../components/history-card';
import customerLaundryDetails from '../../_services/customer-laundry-details';

class historyLaundryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerKey: "",
      historyLaundry: []
    }

    try {
      this.state.customerKey = this.props.navigation.state.params.customerData.key;
      this.state.historyLaundry = this.props.navigation.state.params.history;
    } catch{
      this.state.customerKey = this.props.screenProps.customerKey;
      this.state.historyLaundry = this.props.screenProps.result.history;
    }

  }
  renderListofhistoryComponents() {
    return (
      this.state.historyLaundry.map((data) => {
        return (
          <HistoryCards screenProps={data} />
        )
      })
    )
  }

  render() {

    if (this.state.historyLaundry) {
      return (
        <ScrollView
          style={{ flex: 1, paddingBottom: 49 }}
          contentContainerStyle={{ width: '100%', alignItems: 'center',flexGrow:1,paddingBottom:40 }}>
          <View>{this.renderListofhistoryComponents()}</View>
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

export default historyLaundryScreen;


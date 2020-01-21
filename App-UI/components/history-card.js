import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight, ScrollView } from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements'

class historyCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      customerKey: " ",
      params: {}
    };


    try {
      this.state.items = this.props.screenProps.lis;
      this.state.params = this.props.screenProps;
    }
    catch{
      console.log("catch");
    }



    // if (this.props.screenProps) {
    //     this.setState({ items: this.props.screenProps.lis });
    // }


  }
  render() {
    return (

      <View style={styles.container}>
        <View style={styles.Date}>
          <Text>date given : {this.state.params.dateGiven}</Text>
        </View>
        <View style={styles.tableView}>
          <View style={styles.ItemStyle}>
            <Text>Items</Text>
            {Object.keys(this.state.items).map((e) => {

              return (
                <View key={e} style={styles.itemStyle}>
                  <Text>{this.state.items[e].item}</Text>
                </View>
              )
            })}
          </View>
          <View style={styles.qtyStyle}>
            <Text>Qty</Text>
            {Object.keys(this.state.items).map((e) => {
              return (
                <View key={e} style={styles.itemStyle}>
                  <Text>{this.state.items[e].quantity}</Text>
                </View>
              )
            })}
          </View>
          <View style={styles.priceStyle}>
            <Text>Price</Text>
            {Object.keys(this.state.items).map((e) => {
              return (
                <View key={e} style={styles.itemStyle}>
                  <Text>{this.state.items[e].price}</Text>
                </View>
              )
            })}
          </View>
        </View>
        <View style={styles.strip}>
          <View style={styles.Date}>
            <Text style={{color:'#DDD'}}>
              Total Amount : {this.state.params.amount}
            </Text>
          </View>
          <View style={styles.Date}>
            <Text  style={{color:'#DDD'}}>date pickup : {this.state.params.datePickup}</Text>
          </View>
        </View>

      </View>




    )
  }

}


const styles = StyleSheet.create({
  container: {
    position: 'relative',
    margin: 2,
    height: 'auto',
    justifyContent: "center",
    borderWidth: 0.5,
    borderRadius: 5,
    top: 10,
    left: 10,
    right: 10,
    bottom: 30,
    width: 300
  },
  rule: {
    flex: 1
  },
  Date: {
    marginTop: 3,
    marginLeft: 5,
    alignItems: 'center',
  },
  tableView: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    padding: 10,
    margin: 10,
    justifyContent: "space-between",
  },
  item: {
    padding: 5,
  },
  ItemStyle: {
    padding: 5,
    margin: 5,
  },

  itemStyle: {
    padding: 5,
    marginTop: 10,
  },
  qtyStyle: {
    padding: 5,
    margin: 5,
  },
  priceStyle: {
    padding: 5,
    margin: 5,
  },
  buttons: {
    padding: 10,
    marginTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  confirmBtn: {
    alignItems: 'center',
    backgroundColor: '#0000ff',
    padding: 10,
    borderRadius: 3,
  },
  PayBtn: {
    alignItems: 'center',
    backgroundColor: '#0000ff',
    padding: 10,
    borderRadius: 3,
  },
  text: {
    color: 'white'
  },
  scrollView: {
    top: 0,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  },
  strip:{
    backgroundColor:'black',
    color:'white',
    paddingBottom:10
  }
})

export default historyCard;
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, Image, TouchableOpacity } from 'react-native';


class studentProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileData: {}
    }
  }
  render() {
    this.state.profileData = this.props.navigation.state.params.customerData;


    return (
      <View style={styles.container}>
        <View style={styles.header}></View>
        <Image style={styles.avatar} source={{ uri: this.state.profileData.profilePic }} />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>{this.state.profileData.name}</Text>
            <Text style={styles.description}>
              {this.state.profileData.blockNo}
            </Text>
            <Text style={styles.description}>
              {"Room Number  " + this.state.profileData.roomNo}
            </Text>
            <Text style={styles.description}>
              {this.state.profileData.email}
            </Text>
            <Text style={styles.description}>
              {this.state.profileData.phoneNo}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default studentProfileScreen;

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
});
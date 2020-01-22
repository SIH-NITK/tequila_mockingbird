import React, { Component } from "react";
import DateTimePicker from "react-native-modal-datetime-picker";
import { StyleSheet, Text, View, TextInput, Button, ScrollView, Image, TouchableOpacity, TouchableHighlight } from 'react-native';

import notification from '../../_services/notify';
import NotifyComponent from '../../components/notifyComponent';
import { Tile } from 'react-native-elements';
export default class Notify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
            picked: false,
            data: []
        };
    }

    showDateTimePicker = () => {
        console.log("date time ")
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = obj => {
        console.log("A date has been picked: ", date);
        this.hideDateTimePicker();
        console.log(typeof (obj));
        // console.log(date.date)
        var date = JSON.stringify(obj, null, 4)
        console.log(date);
        date = date.substring(1, 11)
        console.log(date);
        notification.getLaundryData(date).then(res => {
            res.json().then(data => {
                data = JSON.parse(data);
                console.log(data);
                this.setState({ data: data })
                this.setState({ picked: true })
                console.log("here");

                data.map((d) => {
                    console.log(d);
                })

            })
        });

    };
    renderListofNotifyComponents() {
        console.log("arqum")
        console.log(this.state.data);
        try {
            return (
                this.state.data.map((d) => {
                    console.log(d);
                    return (
                        <NotifyComponent screenProps={{ data: d }} />
                    )
                })
            )
        }
        catch{
            return (
                <View>
                    <Text>You cannot  notify right now</Text>
                </View>
            )
        }

    }

    render() {

        return (
            <ScrollView>
                <View>
                    <View>
                        <View >
                            <Tile
                                imageSrc={{uri:'https://homepages.cae.wisc.edu/~ece533/images/fruits.png'}}
                                title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores dolore exercitationem"
                                featured
                                caption="Some Caption Text"
                            />
                        </View>
                        <Text>{"\n"}</Text>
                        <View >
                            <Tile
                                imageSrc={{uri:'https://homepages.cae.wisc.edu/~ece533/images/peppers.png'}}
                                title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores dolore exercitationem"
                                featured
                                caption="Some Caption Text"
                            />
                        </View>
                        <Text>{"\n"}</Text>

                        <View >
                            <Tile
                                imageSrc={{uri:'https://homepages.cae.wisc.edu/~ece533/images/fruits.png'}}
                                title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores dolore exercitationem"
                                featured
                                caption="Some Caption Text"
                            />
                        </View>

                    </View>
                </View>

            </ScrollView>

        )

    }
}

const styles = StyleSheet.create({
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
    text: {
        color: '#DDD'
    }
})
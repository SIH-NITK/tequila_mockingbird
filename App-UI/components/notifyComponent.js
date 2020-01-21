import React, { Component } from "react";
import { StyleSheet, Text, View, Button, TouchableHighlight, ScrollView } from 'react-native';
import Notification from '../_services/notify';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-root-toast';
export default class NotifyComopnent extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        console.log(props.screenProps);
        this.state = {
            items: [],
            customerKey: " ",
            date: "",
            spinner: false,
            toast: false,
            toastMessage: ""
        };
        try {
            console.log("component notify");
            console.log(this.props.screenProps.data)
            this.state.items = this.props.screenProps.data.lis;
            this.state.customerKey = this.props.screenProps.data.key;
            this.state.date = this.props.screenProps.data.dateGiven;
        }
        catch{
            console.log("catch");
        }

    }

    notify(key) {
        this.setState({ spinner: true });
        console.log(key);
        console.log(this.state.date);
        Notification.notify(key, this.state.date).then((res) => {
            this.setState({ spinner: false });
            this.setState({ toastMessage: "notified successfully:)" });
            this.setState({ toast: true });
            setTimeout(() => this.setState({
                toast: false
            }), 2000); // hide toast after 5s
        }).catch((e) => {
            this.setState({ spinner: false });
            this.setState({ toastMessage: "notification failed" });
            this.setState({ toast: true });
            setTimeout(() => this.setState({
                toast: false
            }), 2000); // hide toast after 5s
            console.log(e);
        });

    }


    render() {
        // try {
        //     this.state.items = this.props.screenProps.data.lis;
        //     this.state.amount = this.props.screenProps.data.amount;
        //     this.state.customerKey = this.props.screenProps.key;
        // }
        // catch{
        //     console.log("catch");
        // }
        return (


            <View style={styles.container}>
                <View style={styles.Date}>
                    <Text>{this.state.date}</Text>
                </View>
                <View style={styles.tableView}>
                    <View style={styles.ItemStyle}>
                        <Text>Items</Text>
                        {Object.keys(this.state.items).map((e) => {
                            console.log(e);

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
                <View>
                    <View>
                        <TouchableHighlight style={styles.PayBtn} onPress={() => {
                            this.notify(this.state.customerKey);
                        }}>
                            <Text style={styles.text}>Notify</Text>
                        </TouchableHighlight>
                    </View>
                    <Spinner
                        visible={this.state.spinner}
                        textContent={''}
                        textStyle={styles.spinnerTextStyle}
                        color="black"
                        size="large"
                    />
                    <Toast
                        visible={this.state.toast}
                        position={120}
                        shadow={false}
                        animation={false}
                        hideOnPress={true}
                    >{this.state.toastMessage}</Toast>
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
        alignItems: "center",
        marginTop: 5,
        marginBottom: 5,
        paddingTop: 15,
        paddingBottom: 15,
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: 'black',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff',
        justifyContent: 'space-between'
    },
    text: {
        color: 'white'
    }
})



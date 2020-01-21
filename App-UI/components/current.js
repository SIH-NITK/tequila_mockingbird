import React, { Component } from "react";
import { StyleSheet, Text, View, Button, TouchableHighlight, ScrollView } from 'react-native';
import payment from '../_services/payment';
import customerLaundryDetails from '../_services/customer-laundry-details';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-root-toast';
class Student extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        console.log(props.screenProps);
        this.state = {
            items: [],
            customerKey: " ",
            amount: " ",
            initialState: "1",
            flag: false,
            spinner: false,
            toast: false,
            toastMessage: ""
        };
        try {
            console.log("component laundry")
            this.state.items = this.props.screenProps.data.lis;
            this.state.amount = this.props.screenProps.data.amount;
            this.state.flag = this.props.screenProps.flag;
            console.log(this.state.flag)
            console.log(this.state.screenProps);
            this.state.customerKey = this.props.screenProps.key;
            this.setState({ items: this.props.screenProps.data.lis });
            this.setState({ amount: this.props.screenProps.data.amount });
            console.log(this.state.items)
        }
        catch{
            console.log("catch");
        }

    }

    componentDidMount() {
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    setCurrentLaundry() {
        if (this.props.screenProps) {
            if (this._isMounted) {
                this.setState({ items: this.props.screenProps.lis });
                console.log(this.state.items)
            }
            this.setState({ items: this.props.screenProps.lis });
        }
    }
    resetState = () => {
        this.setState({ initialState: "1" });
    }
    pay(amount) {
        this.setState({ spinner: true })
        console.log(this.props.screenProps); ScrollView
        data = {
            key: this.state.customerKey,
            date: this.props.screenProps.data.dateGiven,
            amount: amount
        }
        console.log(data);
        payment.setDatePickup(data).then((res) => {
            console.log(res);
            this.setState({ spinner: false });
            this.setState({ toastMessage: "payment successfull" });
            this.setState({ toast: true });
            setTimeout(() => this.setState({
                toast: false
            }), 2000); // hide toast after 5s
            this.getCustomerLaundry(this.props.screenProps.key)
        }).catch((e) => {
            this.setState({ spinner: false });
            this.setState({ toastMessage: "payment failed" });
            this.setState({ toast: true });
            setTimeout(() => this.setState({
                toast: false
            }), 2000); // hide toast after 5s
            console.log(e);
        });
    }

    failureCallback = (data) => {
        console.log(data)
    }

    successCallback = (data) => {
        console.log(data)
    }

    getCustomerLaundry(key) {
        // console.log(customerData);
        customerLaundryDetails.getCustomerLaundry(key).then(res => {
            res.json().then(data => {
                console.log(data)
                var curr = [];
                var hist = [];
                data = JSON.parse(data)

                data.forEach(function (obj) {
                    //console.log(obj.id);
                    if (obj.datePickup === "None") {
                        curr.push(obj);
                    }
                    else {
                        hist.push(obj);
                    }
                });
                result = { "current": curr, "history": hist };
                this.props.updateState(result);
                // this.setState({ modalVisible: false }, () => this.props.navigation.navigate('customerHome', { returnData: this.returnData, result: result }));

            })
        });
        // setTimeout(() => {
        //     console.log("here")
        // }, 3000);
    }
    Button() {
        if (this.state.flag) {
            return (
                <View>
                    <TouchableHighlight style={styles.PayBtn} onPress={() => {
                        this.pay(this.state.amount);
                    }}>
                        <Text style={styles.text}>Pay{this.state.amount}</Text>
                    </TouchableHighlight>
                </View>
            );
        }
    }
    render() {
        try {
            this.state.items = this.props.screenProps.data.lis;
            this.state.amount = this.props.screenProps.data.amount;
            this.state.customerKey = this.props.screenProps.key;
        }
        catch{
            console.log("catch");
        }
        return (

            <View style={styles.container}>
                <View style={styles.Date}>
                    <Text>{this.props.screenProps.data.dateGiven}</Text>
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
                {this.Button()}

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

export default Student;

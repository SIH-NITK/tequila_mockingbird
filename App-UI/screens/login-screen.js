import React, { useState } from 'react';
import { Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView, StyleSheet, ActivityIndicator,TouchableHighlight } from 'react-native';
import { Button } from 'react-native-elements';
import * as Google from 'expo-google-app-auth';
import Modal from "react-native-modal";
import customerDetailService from '../_services/customer-details';
import { Dropdown } from 'react-native-material-dropdown';
import customerLaundryDetails from '../_services/customer-laundry-details';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-root-toast';
class customerLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            blockno: "",
            roomno: "",
            phoneno: " ",
            result: {},
            roomNoData: [{
                value: '1',
            }, {
                value: '2',
            }, {
                value: '3',
            }],
            blockNoData: [{
                value: "8th block",
            }, {
                value: 'Mega Towers 1',
            }, {
                value: '3rd Block',
            }],
            spinner: true,
            toast: true
        }

    }


    getRoomBlock = (visible) => {
        this.setState({ modalVisible: visible });
    }
    async pushNotification() {
        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;

        // only ask if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        if (existingStatus !== 'granted') {
            // Android remote notification permissions are granted during the app
            // install, so this will only ask on iOS
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        // Stop here if the user did not grant permissions
        if (finalStatus !== 'granted') {
            return;
        }
        const token = await Notifications.getExpoPushTokenAsync();
        console.log(token);
        return token;
    }

    async googleAuth() {
        try {

            // const result = {
            //     type: 'success',
            //     user: {
            //         name: "manan poddar",
            //         id: "107682254345676540759",
            //         email: "mananpoddarm@gmail.com",
            //         photoUrl: "https://lh3.googleusercontent.com/a-/AAuE7mDF2J8FGmLH7YQ1OXZRQNhGkSCAfJHKuufY4bKj"
            //     }
            // }
            console.log("hello");
            const result = await Google.logInAsync({
                androidClientId: "377481408812-vfanga4h96pknfd50ct8bbn9rd7vkdn5.apps.googleusercontent.com",
                scopes: ['profile', 'email'],
            });
            console.log(result)
            if (result.type === 'success') {
                // this.getRoomBlock(true);
                this.state.result = result;
                return result.accessToken;
            } else {
                console.log("not success");
                return { cancelled: true };
            }

        } catch (e) {
            console.log(e);
            return { error: true };
        }

    }

    adminLogin() {
        this.props.navigation.navigate('adminHome');
    }

    getCustomerLaundry(customerData) {
        // console.log(customerData);
        // customerLaundryDetails.getCustomerLaundry(customerData.key).then(res => {
        //     res.json().then(data => {
        //         var curr = [];
        //         var hist = [];
        //         data = JSON.parse(data)

        //         data.forEach(function (obj) {
        //             //console.log(obj.id);
        //             if (obj.datePickup === "None") {
        //                 curr.push(obj);
        //             }
        //             else {
        //                 hist.push(obj);
        //             }
        //         });
        //         result = { "customerData": customerData, "current": curr, "history": hist };
        //         this.setState({ modalVisible: false }, () => this.props.navigation.navigate('customerHome', result));

        //     })
        // });
        curr = {

        }
        hist = {

        }
        result = { "customerData": customerData, "current": curr, "history": hist };
        this.setState({ modalVisible: false }, () => this.props.navigation.navigate('customerHome', result));

        // setTimeout(() => {
        //     console.log("here")
        // }, 3000);
    }

    async customerLogin() {
        var result = {};
        var authApiResult = this.googleAuth();
        console.log(authApiResult);
        // console.log(authApiResult);
        // token = "asdf";
        token = await this.pushNotification();
        console.log(token);
        // var customerData = {
        //     key: authApiResult.id,
        //     roomNo: this.state.roomno,
        //     blockNo: this.state.blockno,
        //     name: authApiResult.name,
        //     key: authApiResult.id,
        //     email: authApiResult.email,
        //     phoneNo: this.state.phoneno,
        //     profilePic: authApiResult.photoUrl,
        //     pushToken: token
        // }


        // customerDetailService.postCustomerDetails(customerData).then((res) => {
        // }).catch((e) => {
        //     console.log(e);
        // });
        this.setState({ modalVisible: false }, () => this.props.navigation.navigate('customerHome', result));
        // console.log(customerData);
        // this.getCustomerLaundry(customerData);
    }


    render() {

        return (

            <KeyboardAvoidingView style={styles.containerView} behavior="padding">

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.loginScreenContainer}>
                        <View style={styles.loginFormView}>
                            <Text style={styles.logoText}>SIH 2k20 - NITK</Text>
                            {/* <Spinner
                                visible={this.state.spinner}
                                textContent={''}
                                textStyle={styles.spinnerTextStyle}
                                color="#61DAFB"
                                size = "large"
                            /> */}

                            {/* <Modal animationType={"slide"} transparent={true} style={styles.modalContainer}
                                isVisible={this.state.modalVisible}
                                onNavigate={this.customerLogin}
                                onRequestClose={() => { this.setState({ modalVisible: false }); console.log("request") }}
                            > */}

                            {/* <View style={styles.modalContainer}>
                                    <View>

                                        <Dropdown onChangeText={(blockno) => {
                                            this.setState({ blockno });
                                        }
                                        }
                                            label='Block'
                                            data={this.state.blockNoData}
                                        />
                                        <Dropdown onChangeText={(roomno) => {
                                            this.setState({ roomno });
                                        }
                                        }
                                            label='Room Number'
                                            data={this.state.roomNoData}
                                        />
                                        <Text>Enter Your Phone Number :</Text>

                                        <TextInput
                                            onChangeText={(phoneno) => this.setState({ phoneno })}
                                            value={this.state.phoneno}
                                            placeholder={'Phone Number'}
                                            keyboardType={'phone-pad'}
                                            style={styles.textInput}
                                        />


                                        <Button
                                            buttonStyle={styles.googleLoginButton}
                                            onPress={() => {
                                                this.customerLogin();
                                            }}
                                            title="Submit"
                                        />

                                    </View> */}


                            {/* </View> */}

                            {/* </Modal> */}


                            <TouchableHighlight style={styles.endBtn} onPress={() => {
                                this.customerLogin();
                            }}>
                                <Text style={styles.text}>Login with Google</Text>
                            </TouchableHighlight>

                            <TouchableHighlight style={styles.endBtn} onPress={() => {
                                this.adminLogin();
                            }}>
                                <Text style={styles.text}>Admin Login</Text>
                            </TouchableHighlight>

                            {/* <Button
                                buttonStyle={styles.googleLoginButton}
                                onPress={() => {
                                    console.log("google");
                                    this.customerLogin();
                                }}
                                title="Login with google"
                            />
                            <Button

                                onPress={() => {
                                    console.log("admin");
                                    this.adminLogin()
                                }}
                                title="admin login"
                                // style={{color:'black'}}
                                // theme='dark'
                                color="black"
                                buttonStyle={styles.googleLoginButton}
                            /> */}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    containerView: {
        flex: 1,
        padding: 20,
        backgroundColor: 'black'
    },
    loginScreenContainer: {
        flex: 1,
    },
    logoText: {
        fontSize: 40,
        fontWeight: "800",
        marginTop: 150,
        marginBottom: 30,
        textAlign: 'center',
        color: 'white'
    },
    googleLoginButton: {
        height: 45,
        marginTop: 10,
        backgroundColor: 'white',
        color: 'black'
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        height: 10,
        width: 300
    },
    textInput: {
        height: 40,
        borderColor: 'white',
        borderBottomColor: 'grey',
        borderWidth: 1
    },
    spinnerTextStyle: {
        color: '#FFF'
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
      text: {
        color: '#DDD'
      }
})

export default customerLogin;

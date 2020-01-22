import React, { Component, useEffect } from "react";
import { StyleSheet, Text, View, Button, TextInput, FlatList, TouchableWithoutFeedback, Slider, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Card, ListItem } from 'react-native-elements'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';

import createScreen from '../admin/create'
import currentLaundryScreen from '../customer/current-laundry';
import historyLaundryScreen from '../customer/history-laundry';
import { Dropdown } from 'react-native-material-dropdown';
import customerDetailService from '../../_services/customer-details';
import Modal from "react-native-modal";
import getGraphs from '../../_services/getgraphs';
import { StackedAreaChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import apiUrl from '../../environment';
import { Tile } from 'react-native-elements';
import Toast, {DURATION} from 'react-native-easy-toast'
class adminHome extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            blockno: "",
            roomno: "",
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
            data: [],
            modalVisible: false,
            customerKey: "",
            result: {},
            value: 0,
            timestamps: [],
            urlLocation: " ",
            // urlLocation:"/home/manan/SIH/SIH-/App-UI/assets/homeImages/overlayed/awifs_ndvi_201701_15_1_clipped.jpg",
            images: [
                require('../../assets/homeImages/overlayed/awifs_ndvi_201701_15_1_clipped.jpg'),
                require('../../assets/homeImages/overlayed/awifs_ndvi_201701_15_2_clipped.jpg'),
                require('../../assets/homeImages/overlayed/awifs_ndvi_201702_15_1_clipped.jpg'),
                require('../../assets/homeImages/overlayed/awifs_ndvi_201702_15_2_clipped.jpg'),
                require('../../assets/homeImages/overlayed/awifs_ndvi_201703_15_1_clipped.jpg'),
                require('../../assets/homeImages/overlayed/awifs_ndvi_201703_15_2_clipped.jpg'),
                require('../../assets/homeImages/overlayed/awifs_ndvi_201704_15_1_clipped.jpg'),
                require('../../assets/homeImages/overlayed/awifs_ndvi_201704_15_2_clipped.jpg'),
                require('../../assets/homeImages/overlayed/awifs_ndvi_201705_15_1_clipped.jpg'),
                require('../../assets/homeImages/overlayed/awifs_ndvi_201705_15_2_clipped.jpg'),
                require('../../assets/homeImages/overlayed/awifs_ndvi_201706_15_1_clipped.jpg'),
                require('../../assets/homeImages/overlayed/awifs_ndvi_201706_15_2_clipped.jpg'),
                require('../../assets/homeImages/overlayed/awifs_ndvi_201707_15_1_clipped.jpg'),
                require('../../assets/homeImages/overlayed/awifs_ndvi_201707_15_2_clipped.jpg'),
                require('../../assets/homeImages/overlayed/awifs_ndvi_201708_15_1_clipped.jpg'),
                require('../../assets/homeImages/overlayed/awifs_ndvi_201708_15_2_clipped.jpg'),
                require('../../assets/homeImages/overlayed/awifs_ndvi_201709_15_1_clipped.jpg'),
                require('../../assets/homeImages/overlayed/awifs_ndvi_201709_15_2_clipped.jpg'),
                require('../../assets/homeImages/overlayed/awifs_ndvi_201710_15_1_clipped.jpg'),
                require('../../assets/homeImages/overlayed/awifs_ndvi_201710_15_2_clipped.jpg'),
                require('../../assets/homeImages/overlayed/awifs_ndvi_201711_15_1_clipped.jpg'),
                require('../../assets/homeImages/overlayed/awifs_ndvi_201711_15_2_clipped.jpg'),
                require('../../assets/homeImages/overlayed/awifs_ndvi_201712_15_1_clipped.jpg'),
                require('../../assets/homeImages/overlayed/awifs_ndvi_201712_15_2_clipped.jpg'),
                require('../../assets/homeImages/overlayed/awifs_ndvi_201801_15_1_clipped.jpg'),
                require('../../assets/homeImages/overlayed/awifs_ndvi_201801_15_2_clipped.jpg'),
                require('../../assets/homeImages/overlayed/awifs_ndvi_201802_15_1_clipped.jpg'),
                require('../../assets/homeImages/overlayed/awifs_ndvi_201802_15_2_clipped.jpg'),
                require('../../assets/homeImages/overlayed/awifs_ndvi_201803_15_1_clipped.jpg'),
                require('../../assets/homeImages/overlayed/awifs_ndvi_201803_15_2_clipped.jpg'),
                require('../../assets/homeImages/overlayed/awifs_ndvi_201804_15_1_clipped.jpg'),
                require('../../assets/homeImages/overlayed/awifs_ndvi_201804_15_2_clipped.jpg'),
                require('../../assets/homeImages/overlayed/awifs_ndvi_201805_15_1_clipped.jpg'),
                require('../../assets/homeImages/overlayed/awifs_ndvi_201805_15_2_clipped.jpg'),
                require('../../assets/homeImages/overlayed/awifs_ndvi_201806_15_1_clipped.jpg'),
                require('../../assets/homeImages/overlayed/awifs_ndvi_201806_15_2_clipped.jpg'),
                require('../../assets/homeImages/overlayed/awifs_ndvi_201807_15_1_clipped.jpg'),
                require('../../assets/homeImages/overlayed/awifs_ndvi_201807_15_2_clipped.jpg'),
                require('../../assets/homeImages/overlayed/awifs_ndvi_201808_15_1_clipped.jpg'),
                require('../../assets/homeImages/overlayed/awifs_ndvi_201808_15_2_clipped.jpg'),
                require('../../assets/homeImages/overlayed/awifs_ndvi_201809_15_1_clipped.jpg'),
                require('../../assets/homeImages/overlayed/awifs_ndvi_201809_15_2_clipped.jpg'),
                require('../../assets/homeImages/overlayed/awifs_ndvi_201810_15_1_clipped.jpg'),
                require('../../assets/homeImages/overlayed/awifs_ndvi_201810_15_2_clipped.jpg'),
                require('../../assets/homeImages/overlayed/awifs_ndvi_201811_15_1_clipped.jpg'),
                require('../../assets/homeImages/overlayed/awifs_ndvi_201811_15_2_clipped.jpg'),
                require('../../assets/homeImages/overlayed/awifs_ndvi_201812_15_1_clipped.jpg'),
                require('../../assets/homeImages/overlayed/awifs_ndvi_201812_15_2_clipped.jpg')
            ],
            graphData: [],
            toastData:[]

        }
        this._isMounted = false;
        const singleValues = [33];
        // this.fromIToImage();
        console.log(this.state.timestamps);
        // console.log(Images);
    }


    makeModalVisible = (visible) => {
        this._isMounted = true;
        if (this._isMounted) {
            this.setState({ modalVisible: visible });
        }
    }
    fromIToImage(value) {

        let timestamps = [];
        for (let i = 1; i <= 24; i++) {

            if (i <= 12) {
                let year = '2017';
                if (i % 13 < 10) {
                    year = year + '0' + (i % 13);
                }
                else {
                    year = year + (i % 13);
                }
                let year1 = year + '_15_' + '1';
                let year2 = year + '_15_' + '2';
                timestamps.push(year1);
                timestamps.push(year2);
            }
            else {
                let year = '2018';
                if (i % 12 == 0) {
                    year = year + '12';
                }
                else if (i % 12 < 10) {
                    year = year + '0' + (i % 12);
                }
                else {
                    year = year + (i % 12);
                }
                let year1 = year + '_15_' + '1';
                let year2 = year + '_15_' + '2';
                timestamps.push(year1);
                timestamps.push(year2);
            }
            timestamps.push()
        }
        return timestamps[value];
        this.setState({ timestamps: timestamps });
    }
    componentDidMount() {
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    getCustomerProfile() {
        if (this.state.roomno != "" && this.state.blockno != "") {
            customerDetailService.getCustomerProfile(this.state.roomno, this.state.blockno).then(res => {
                res.json().then(dataa => {
                    const v1 = JSON.parse(dataa);
                    if (this._isMounted) {
                        this.setState({ modalVisible: true })
                        this.setState({ data: v1 });
                    }
                })
            })
        }



    }
    selectedCustomerKey(key) {
        // console.log(key);
        if (this._isMounted) {
            this.setState({ customerKey: key });
            this.setState({ modalVisible: false });
            customerLaundryDetails.getCustomerLaundry(key).then(res => {
                res.json().then(data => {
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
                    this.setState({ result: result });
                })
            });

        }
    }
    _renderList() {

        return (
            <Card containerStyle={{ padding: 0 }} >
                {
                    this.state.data.map((data) => {
                        console.log(data);
                        return (
                            <TouchableWithoutFeedback onPress={(event) => this.selectedCustomerKey(data.key)}>
                                <ListItem
                                    key={data.key}
                                    roundAvatar
                                    title={data.name}
                                    avatar={{ uri: data.profilePic }}
                                />
                            </TouchableWithoutFeedback>
                        );
                    })
                }
            </Card>

        );
    }

    change(value) {
        // this.setState(() => {
        //   return {
        //     value: parseFloat(value),
        //   };
        // });
        console.log(value);
        this.setState({ value: value - 1 })
        console.log(this.state.timestamps);
        // urlLocation =  "/home/manan/SIH/SIH-/App-UI/assets/homeImages/overlayed/awifs_ndvi_"+ this.fromIToImage(value) + "_clipped.jpg";
        // console.log(urlLocation);
        // this.setState({urlLocation:urlLocation});

    }
    handlePress = async (evt) => {
        console.log(`x coord = ${evt.nativeEvent.locationX}`);
        x_coor = evt.nativeEvent.locationX;
        y_coor = evt.nativeEvent.locationX;

        y = parseInt(2118 * parseInt(y_coor) / 400);
        x = parseInt(2135 * parseInt(x_coor) / 400);
        console.log(x + " ", y);

        // getGraphs.getgraphs(x,y).then(res => {
        //     res.json().then(data => {
        //         console.log("hi")
        //         data = JSON.parse(data)
        //         console.log(data);
        //     })
        // });
        var URL = apiUrl + `?r=${y}&c=${x}`;
        URL = apiUrl + '?r=' + y + '&c=' + x;
        // console.log(URL);
        // console.log(typeof (URL));
        // fetch('http://192.168.43.14:5000/?r=1115&c=674');
        try {
            // URL = "https://google.com"
            const response = await fetch(URL);
            const json = await response.json();
            // just log ‘json’
            console.log(json);
            graph_data = json.graph_data;
            // console.log("graph");
            // console.log(graph_data);
            arr_graph = [];
            graph_data.map((obj, i) => {
                arr_graph.push({
                    month: i,
                    apples: obj
                })
            })

            // console.log("array");
            // console.log(arr_graph);
            this.setState({ graphData: arr_graph });
            this.setState({toastData:json.crop_interval})
        }
        catch (e) {
            console.log(e);
        }


    }
    showToast(){
        console.log(this.state.toastData)
        Dates1 = this.fromIToImage(this.state.toastData[0].img_idx[0])
        Dates2 = this.fromIToImage(this.state.toastData[0].img_idx[1])
        console.log(Dates1+" "+Dates2);
        this.refs.toast.show(<View><Text style={{color:'white'}}>hello world!</Text></View>);
    }
    render() {
        // const {value} = this.state;
        const w = Dimensions.get('window');
        var urlLocation = this.state.urlLocation;
        // console.log(this.state.urlLocation);
        // console.log(typeof (this.state.urlLocation));
        var images = this.state.images;
        // console.log(images);
        tab = createMaterialTopTabNavigator(
            {
                AddLaundry: createScreen,
                current: currentLaundryScreen,
                history: historyLaundryScreen
            },
            {
                tabBarOptions: {
                    activeTintColor: 'white', // not working
                    inactiveTintColor: 'grey', // not working
                    style: {
                        marginTop: -10,
                        paddingVertical: 0,
                        backgroundColor: 'black',
                        color: "white",
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: -3 },
                        shadowOpacity: 0.13,
                        shadowRadius: 5,
                        elevation: 3,
                    },
                    indicatorStyle: {
                        height: 0
                    },
                    showIcon: true,
                    showLabel: true,

                },

            }
        )
        TabApp = createAppContainer(tab);
        value = this.state.value;
        value = 5;

        var url_image = this.state.urlLocation;
        var v = this.fromIToImage(value);
        // console.log(url_image);
        // var url_image = require('/home/manan/SIH/SIH-/App-UI/assets/homeImages/overlayed/awifs_ndvi_'+ v +'_clipped.jpg')
        // console.log("url" + url_image);
        data = [
            {
                month: new Date(2015, 0, 1),
                apples: 3840,
            },
            {
                month: new Date(2015, 1, 1),
                apples: 1600,
            },
            {
                month: new Date(2015, 2, 1),
                apples: 640,
            },
            {
                month: new Date(2015, 3, 1),
                apples: 3320,
            },
        ]
        data = this.state.graphData;
        const colors = ['#8800cc']
        const keys = ['apples']
        const svgs = [
            { onPress: () =>{console.log('apples'); this.showToast()}  },
            { onPress: () => console.log('bananas') },
            { onPress: () => console.log('cherries') },
            { onPress: () => console.log('dates') },
        ]
        return (
            <View style={styles.container}>

                <Slider
                    step={1}
                    maximumValue={48}
                    minimumValue={1}
                    onValueChange={this.change.bind(this)}
                    value={value}
                />
                <View style={{ margin: 5 }}></View>
                <TouchableOpacity onPress={(evt) => this.handlePress(evt)} >

                    <Image

                        // source ={require('/home/manan/SIH/SIH-/App-UI/assets/homeImages/overlayed/awifs_ndvi_'+ this.fromIToImage(value) +'_clipped.jpg')}
                        source={images[this.state.value]}
                        style={{ width: 400, height: 400 }}
                    />
                </TouchableOpacity>

                <Toast
                    ref="toast"
                    style={{backgroundColor:'black',marginTop:100}}
                    position='center'
                    positionValue={2000}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{color:'white'}}
                />

                <View>
                    <StackedAreaChart
                        style={{ height: 200, paddingVertical: 16 }}
                        data={data}
                        keys={keys}
                        colors={colors}
                        curve={shape.curveNatural}
                        showGrid={true}
                        svgs={svgs}
                    />
                </View>


            </View>

        );
    }
}
export default adminHome;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 300,
        backgroundColor: 'white'
    },
})


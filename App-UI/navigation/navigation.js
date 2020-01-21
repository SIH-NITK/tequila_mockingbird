import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs';
//customer routes
import studentProfileScreen from '../screens/customer/student-profile';
import currentLaundryScreen from '../screens/customer/current-laundry';
import historyLaundryScreen from '../screens/customer/history-laundry';
//admin routes
import adminHome from '../screens/admin/home';
import notification from '../screens/admin/notify';
//login route
import loginScreen from '../screens/login-screen';


const customerBottomTabNavigator = createBottomTabNavigator({
  Home:adminHome,
  Profile: studentProfileScreen
},
  {
    defaultNavigationOptions: () => ({}),
    tabBarOptions: {
      activeTintColor: 'black',
      style: {
        paddingBottom: 15
      }
    }
  }
);


const adminBottomTabNavigator = createBottomTabNavigator({
  Home: adminHome,
  MyInfo: notification
},
  {
    defaultNavigationOptions: () => ({}),
    tabBarOptions: {
      activeTintColor:'black',
      style: {
        paddingBottom: 15
      }
    }
  }
);

const stackNavigator = createStackNavigator({
  login: loginScreen,
  customerHome: customerBottomTabNavigator,
  adminHome: adminBottomTabNavigator
},
  {
    headerMode: 'none'
  });


export default createAppContainer(stackNavigator);

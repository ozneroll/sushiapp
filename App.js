import React from 'react';
import { createStackNavigator } from 'react-navigation';
import ListScreen from './ListScreen';
import SushiRestaurant from './SushiRestaurant';
import EditSushiRestaurant from './EditSushiRestaurant';
import AddSushiRestaurant from './AddSushiRestaurant';

export default class App extends React.Component {

  render() {
    console.disableYellowBox = true;
    const MyApp = createStackNavigator({
      ListAddresses: { screen: ListScreen },
      SushiDetails: { screen: SushiRestaurant },
      EditRestaurant: { screen: EditSushiRestaurant },
      AddRestaurant: { screen: AddSushiRestaurant }
    }, {
      headerMode: 'screen',
      cardStyle: { backgroundColor: '#FFFFFF' },
    });

    return <MyApp />
  }
}


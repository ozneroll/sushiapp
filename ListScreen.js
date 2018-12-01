import React from 'react';
import { StyleSheet, Text, View, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { FormLabel, FormInput, Button, Header, List, ListItem } from 'react-native-elements';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class ListScreen extends React.Component {

    static navigationOptions = { title: 'Sushi restaurants' };

    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        this.state = {list: [],  token: params.token  };
    }

    componentDidMount() {
        this.getRestaurants();
    }

    componentDidUpdate() {
        this.getRestaurants();
    }

    deleteItem = (link) => {
        fetch(link, {
            method: 'DELETE',
            headers: {
                 Accept: 'application/json',
                'Content-Type' : 'application/json',
                'Authorization' : this.state.token
            },
        }).then(response => 'done');
        this.getRestaurants();
    }

    deleteConfirmation = (link) => {
        if(this.state.token != '') {
        Alert.alert(
            'Confirmation',
            'Do you want to delete this restaurant ?',
            [              
              {text: 'Cancel'},
              {text: 'OK', onPress: () => this.deleteItem(link)},
            ]
          )
        }
    }

    getRestaurants = async () => {
        
        const url = 'https://radiant-bastion-60132.herokuapp.com/api/sushiRestaurants';
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ 
                    list: responseJson._embedded.sushiRestaurants
                });
            })
            .catch((error) => {
                Alert.alert(error);
            });
    }

    render() {


        


        if(this.state.list === [])
        {
            return (
            <View style={styles.centered}>
                <ActivityIndicator size={'large'}/>
            </View>
            )
        }

        const { navigate } = this.props.navigation;
        var {addButtonRender} = <View></View>; 
        if(this.state.token != '')
        {
            addButtonRender =
            <View style={styles.btn}>
                <Button title='Add' onPress={() => navigate('AddRestaurant', { token: this.state.token })}/>
            </View>;
        }
        else{}
        

        return (
            <View style={styles.container}>
                <View>{addButtonRender}</View>
                <ScrollView>
                    <List containerStyle={{ marginBottom: 20 }}>
                        {
                            this.state.list.map((l) => (
                                <ListItem
                                    key={l.id}
                                    title={l.name}
                                    subtitle={
                                        <View style={{alignItems: 'flex-start', marginLeft: 10 }}>
                                        <Stars
                                            disabled={true}
                                            default={parseFloat(l.overallRating)}
                                            count={5}
                                            half={true}
                                            starSize={50} 
                                            fullStar={<Icon name={'star'} />}
                                            emptyStar={<Icon name={'star-outline'} />}
                                            halfStar={<Icon name={'star-half'} 
                                            />}
                                            />
                                    </View>
                                    }
                                    onPress={() => navigate('SushiDetails', { name: l.name, overallRating: l.overallRating, description: l.description, selection: l.selection, 
                                        quality: l.quality, price: l.price, extraFeatures: l.extraFeatures, 
                                        latitude: l.latitude, longitude: l.longitude, self: l._links.self.href, city: l._links.city.href, token: this.state.token })}

                                    
                                    onLongPress={() => this.deleteConfirmation(l._links.self.href)}
                                />
                            ))
                        }
                    </List>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    btn: {
        marginTop: 20
    },
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

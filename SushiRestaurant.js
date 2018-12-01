import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { MapView } from 'expo';
import { Header, Button } from 'react-native-elements';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';




export default class MapScreen extends React.Component {

    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        this.state = { 
            name: params.name, description: params.description, selection: params.selection, 
            quality: params.quality, price: params.price, extraFeatures: params.extraFeatures,
            latitude: params.latitude, longitude: params.longitude, overallRating: params.overallRating, 
            self: params.self, city: params.city, cityString: '', token: params.token
        };

        
    }

    static navigationOptions = { title: 'Sushi restaurants' };

    static navigationOptions = ({ navigation }) => ({
        
        headerTitle: navigation.state.params.name,
        
        headerLeft: (
        <View style={{alignItems: 'flex-start', marginLeft: 10, marginRight: 10 }}>
            <Stars
            disabled={true}
            default={parseFloat(navigation.state.params.overallRating)}
            count={5}
            half={true}
            starSize={60} 
            fullStar={<Icon name={'star'} />}
            emptyStar={<Icon name={'star-outline'} />}
            halfStar={<Icon name={'star-half'}
            />}
            />
        </View>
        ),

        headerRight: (navigation.state.params.token != '')? (

            <View style={{marginRight: 10}}>
                
                <Icon 
                name={'table-edit'}
                onPress={ () => navigation.navigate('EditRestaurant', { name: navigation.state.params.name, overallRating: navigation.state.params.overallRating, description: navigation.state.params.description, selection: navigation.state.params.selection, 
                    quality: navigation.state.params.quality, price: navigation.state.params.price, extraFeatures: navigation.state.params.extraFeatures, 
                    latitude: navigation.state.params.latitude, longitude: navigation.state.params.longitude, self: navigation.state.params.self, city: navigation.state.params.city, token: navigation.state.params.token })
                }
                size={26}
                />
                
            </View>
        ):(<View></View>)
            
        });

    

    

    componentDidMount() {
        this.getRestaurantString(this.state.city)
    }

    getRestaurantString = (link) => {
        fetch(link)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ 
                    cityString: responseJson.name
                });
            })
            .catch((error) => {
                Alert.alert(error);
            });
    }  


    render() {
        

        if(this.state.cityString === '')
        {
            return (
            <View style={styles.centered}>
                <ActivityIndicator size={'large'}/>
            </View>
            )
        }

        return (

            <View style={styles.container}>

                <Text style={styles.subtitle}>Location</Text>
                <Text>{this.state.cityString}</Text>

                <View style={styles.details}>
                <Text style={styles.subtitle}>Description</Text>
                <Text>{this.state.description}</Text>
                <Text style={styles.subtitle}>Price</Text>
                <Text>{this.state.price} euros</Text>
                <Text style={styles.subtitle}>Extra features</Text>
                <Text>{this.state.extraFeatures}</Text>

                <Text style={styles.subtitle}>Selection</Text>
                <View style={{alignItems: 'flex-start'}}>
                <Stars
                disabled={true}
                default={parseFloat(this.state.selection)}
                count={5}
                half={true}
                starSize={50} 
                fullStar={<Icon name={'star'} />}
                emptyStar={<Icon name={'star-outline'} />}
                halfStar={<Icon name={'star-half'} 
                />}
                />
                </View>

                <Text style={styles.subtitle}>Quality</Text>
                <View style={{alignItems: 'flex-start'}}>
                <Stars
                disabled={true}
                default={parseFloat(this.state.quality)}
                count={5}
                half={true}
                starSize={50} 
                fullStar={<Icon name={'star'} />}
                emptyStar={<Icon name={'star-outline'} />}
                halfStar={<Icon name={'star-half'} 
                />}
                />
                </View>

                

                </View>
                
                <MapView style={styles.map}
                    region={{ latitude: parseFloat(this.state.latitude), longitude: parseFloat(this.state.longitude), latitudeDelta: 0.0322, longitudeDelta: 0.0221 }}>
                    <MapView.Marker coordinate={{ latitude: parseFloat(this.state.latitude), longitude: parseFloat(this.state.longitude) }} title={this.state.name} />
                </MapView>
                
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginLeft: 10,
        marginRight: 10
    },
    map: {
        flex: 1,
        width: '100%',
        marginBottom: 10
    },
    details: {
        flex: 1
    },
    subtitle: {
        fontWeight: "bold",
        marginTop: 10
    },
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
   
});

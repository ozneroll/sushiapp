import React from 'react';
import { StyleSheet, View, Text, Alert, ToastAndroid, ScrollView, Picker, ActivityIndicator  } from 'react-native';
import { MapView } from 'expo';
import { Header, FormInput, FormLabel, Button } from 'react-native-elements';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StarRating from 'react-native-star-rating';


export default class EditScreen extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'Edit',
        headerRight: (
            <View style={{marginRight: 10}}>
            <Icon
                name="content-save"
                type="material-community"
                size={25}
                onPress={navigation.getParam('save')}
            />
            </View>
        )
        });
    
    componentDidMount() {
            this.props.navigation.setParams({ save: () => this.save(this.state.self) });
            this.getCity();
            this.getCities();
    }

    getCities = () => {
        const url = 'https://radiant-bastion-60132.herokuapp.com/api/cities';
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ 
                    cityList: responseJson._embedded.cities,
                });
            })
            .catch((error) => {
                Alert.alert(error);
            });
    }

    getCity = () => {
        const url = this.state.city;
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ 
                    city: responseJson._links.self.href,
                });
            })
            .catch((error) => {
                Alert.alert(error);
            });
    }

    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        this.state = { 
            name: params.name, description: params.description, selection: params.selection, 
            quality: params.quality, price: params.price, extraFeatures: params.extraFeatures,
            latitude: params.latitude, longitude: params.longitude, overallRating: params.overallRating, 
            self: params.self, city: params.city, cityList: [], token: params.token
        };   
    }
    

    save = (link) => {
        fetch(link, {
            method: 'PATCH',
            headers: {
                 Accept: 'application/json',
                'Content-Type' : 'application/json',
                'Authorization' : this.state.token
            },
            body: JSON.stringify({
                name: this.state.name,
                overallRating: parseFloat(this.state.overallRating),
                description: this.state.description,
                price: parseFloat(this.state.price),
                extraFeatures: this.state.extraFeatures,
                selection: parseFloat(this.state.selection),
                quality: parseFloat(this.state.quality),
                latitude: parseFloat(this.state.latitude),
                longitude: parseFloat(this.state.longitude),
                city: this.state.city
              })
        }).then(response => 'done');
        ToastAndroid.show('Changes done', ToastAndroid.SHORT);
        this.props.navigation.navigate('ListAddresses');
        
    }

    

    render() {

        
        

        if(this.state.cityList.length === 0)
        {
            return (
                <View style={styles.centered}>
                    <ActivityIndicator />
                </View>
            )
        }

        
        return (

            

            <ScrollView style={styles.container} behavior="position" enabled={true}>

                    <FormLabel>Name</FormLabel>
                    <FormInput onChangeText={(name) => this.setState({ name })} value={this.state.name} />

                    <FormLabel>City</FormLabel>
                    <View style={{ height: 50, width: 200, marginLeft: 13 }}>
                    <Picker
                    
                    selectedValue={this.state.city}
                    onValueChange={(itemValue) => this.setState({
                        city: itemValue
                    })} 
                    >
                    {this.state.cityList.map((item, key)=>(
                     <Picker.Item label={item.name} value={item._links.self.href} key={key} />)
                    )}
                    </Picker>
                    </View>    
                    
                    <FormLabel>Overall Rating</FormLabel>
                    <View style={styles.stars}>
                     <StarRating
                            disabled={false}
                            emptyStar={'ios-star-outline'}
                            fullStar={'ios-star'}
                            halfStar={'ios-star-half'}
                            iconSet={'Ionicons'}
                            maxStars={5}
                            halfStarEnabled={true}
                            rating={parseFloat(this.state.overallRating)}
                            selectedStar={(rating) => this.setState({overallRating: rating})}
                            fullStarColor={'black'}
                            starSize={25}
                        />    
                    </View>
                    <FormLabel>Description</FormLabel>
                    <FormInput onChangeText={(description) => this.setState({ description })} value={this.state.description} />
                    
                    <FormLabel>Price</FormLabel>
                    <FormInput keyboardType="numeric" onChangeText={(price) => this.setState({ price })} value={this.state.price.toString()} />
                    
                    <FormLabel>Extra features</FormLabel>
                    <FormInput onChangeText={(extraFeatures) => this.setState({ extraFeatures })} value={this.state.extraFeatures}/>

                    <FormLabel>Selection</FormLabel>
                    <View style={styles.stars}>
                        
                        <StarRating
                            disabled={false}
                            emptyStar={'ios-star-outline'}
                            fullStar={'ios-star'}
                            halfStar={'ios-star-half'}
                            iconSet={'Ionicons'}
                            maxStars={5}
                            halfStarEnabled={true}
                            rating={parseFloat(this.state.selection)}
                            selectedStar={(rating) => this.setState({selection: rating})}
                            fullStarColor={'black'}
                            starSize={25}
                        />
                    </View>

                    <FormLabel>Quality</FormLabel>
                    
                    <View style={styles.stars}>
                    <StarRating
                            disabled={false}
                            emptyStar={'ios-star-outline'}
                            fullStar={'ios-star'}
                            halfStar={'ios-star-half'}
                            iconSet={'Ionicons'}
                            maxStars={5}
                            halfStarEnabled={true}
                            rating={parseFloat(this.state.quality)}
                            selectedStar={(rating) => this.setState({quality: rating})}
                            fullStarColor={'black'}
                            starSize={25}
                        />
                    </View>
                    
                    <FormLabel>Latitude</FormLabel>
                    <FormInput keyboardType="numeric" onChangeText={(latitude) => this.setState({ latitude })} value={this.state.latitude.toString()} />

                    <FormLabel>Longitude</FormLabel>
                    <FormInput keyboardType="numeric" onChangeText={(longitude) => this.setState({ longitude })} value={this.state.longitude.toString()} />

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        
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
    stars: {
        alignItems: 'flex-start',
        marginLeft: 17,
        marginTop: 5,
        height: 30,
    },
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
   
});

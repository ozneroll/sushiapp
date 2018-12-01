import React, { Component } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { FormInput, Button } from 'react-native-elements';

export default class Login extends Component {

    static navigationOptions = { title: 'Login' };

    constructor(props) {
        super(props);
        this.state = { username: '', password: '', message: '', token: '' };
    }


    submit = () => {
        const url = "https://radiant-bastion-60132.herokuapp.com/api/login";
        fetch(url, {
            method: 'POST',
            headers: {
                 Accept: 'application/json',
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
              })
        }).then((response) => {
            if(response.status == 200) {
                
                
                if(this.state.username == 'admin')
                {
                    this.setState({
                        token: response.headers.get('Authorization')
                    })
                }
                else {
                    this.setState({
                        token: ''
                    })
                }
                this.setState({
                    message: '',
                    username: '',
                    password: ''
                })
                this.props.navigation.navigate('ListAddresses', {token: this.state.token});
            }
            else {
                this.setState({
                    message: 'Wrong password or login'
                })
            }
        });
        
        
    } 

    render() {
        return (
            <ScrollView style={{padding: 20}}>
                <Text style={{color: 'red'}}>{this.state.message}</Text>
                <FormInput placeholder='Username' value={this.state.username} onChangeText={(username) => this.setState({ username })} />
                <FormInput placeholder='Password' value={this.state.password} secureTextEntry={true} onChangeText={(password) => this.setState({ password })} />
                <View style={{margin:7}} />
                <Button 
                    onPress={() => this.submit()}
                    title="Submit"
                />
                
            </ScrollView>
            )
    }
}
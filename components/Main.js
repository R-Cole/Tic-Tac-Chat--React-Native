// });

import React, { Component } from 'react';
import { Button, TouchableOpacity, View, Text, TextInput, StyleSheet } from 'react-native';
import firebase from 'firebase';
import Fire from '../Fire';

class Main extends React.Component {
  constructor(props){

    super(props);
    this.state = {
      name: '',
      showthis:''
 
    }

    //this.onChangeText = this.onChangeText.bind(this);

  }

    onChangeText = (name) => {
       
      let nameInput = name;

      this.setState({name:nameInput});
    
    }
  
    onPress = () => {
      if(this.state.name != ''){

        this.props.navigation.navigate('Chat', { name: this.state.name });

      }
     
    }
    
    signOutUser = async () => {
      if(this.state.name !== '')
      try {
          await firebase.auth().signOut();
          this.setState({name:''});
      } catch (e) {
          console.log(e);
      }
  }
   
    
  
  render() {

    let visibleLogout = <Text>................................</Text>;

    if(this.state.name !== ''){

      visibleLogout = <Button title='LOG ME OUT' onPress={this.signOutUser}></Button>;

    }


    return (
    
    <View>
      <Text style={styles.title}>Enter Your Name: </Text>
      <TextInput 
        style={styles.nameInput}
        placeHolder='John Cena'
        onChangeText={this.onChangeText}
        value={this.state.name}
      />
      <Text>................................</Text>
      <Text>CURRENT USER NAME IS: {this.state.name}</Text>
      <TouchableOpacity >
        <Button title='LOG ME IN'style={styles.buttonText} onPress={this.onPress} >LOG IN ANONYMOUSLY</Button>
      </TouchableOpacity>
      <Text>--->{this.state.showthis}</Text>
      {visibleLogout}
    </View>

    )
  }
}

const offset = 24;
const styles = StyleSheet.create({

  nameInput: {

    height: offset * 2,
    margin: offset,
    borderRadius: 10,
    paddingHorizontal: offset,
    borderColor: '#111111',
    borderWidth: 1

  },
  title: {
    marginTop: offset,
    marginLeft: offset,
    fontSize: offset
  },
  buttonText: {
    marginLeft:offset,
    fontSize: offset
  }

});

export default Main;

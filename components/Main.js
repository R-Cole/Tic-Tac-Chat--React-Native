// });

import React, { Component } from 'react';
import { Image,Button, TouchableOpacity, View, Text, TextInput, StyleSheet } from 'react-native';
import firebase from 'firebase';
import Fire from '../Fire';
import Header from '../assets/tic_tac_chat_header.png';

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

    let visibleLogout = <Text style={styles.special}> </Text>;

    if(this.state.name !== ''){

      visibleLogout = <Button title='LOG ME OUT' onPress={this.signOutUser}></Button>;

    }


    return (
    
    <View style={{flex: 1, backgroundColor: 'powderblue'}}>
      
      <Image source={Header} style={styles.header}/>
      
       
      <Text style={styles.special}> </Text>
      <Text style={styles.title}>Enter Your Name: </Text>
      <TextInput 
        style={styles.nameInput}
        placeHolder='John Cena'
        onChangeText={this.onChangeText}
        value={this.state.name}
      />
      <Text style={styles.special}> </Text>
      <Text style={styles.title} >CURRENT USER IS: {this.state.name}</Text>
      <Text style={styles.special}> </Text>
      <TouchableOpacity >
        <Button title='LOG ME IN'style={styles.buttonText} onPress={this.onPress} >LOG IN ANONYMOUSLY</Button>
      </TouchableOpacity>
      <Text style={styles.special}> </Text>
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
    borderWidth: 1,
    backgroundColor: 'white',

  },
  title: {
    marginTop: offset,
    marginLeft: offset,
    fontSize: offset
  },
  buttonText: {
    borderRadius: 10,
    paddingHorizontal: offset,
    borderColor: '#111111',
    borderWidth: 1,
    backgroundColor: 'yellow',
    marginLeft:offset,
    fontSize: offset
  },
  special: {
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    fontSize: 5,
    marginTop: 0,
    width: 400,
    backgroundColor: '#499999',
  },
  larger: {
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 0,
    width: 300 
  },
  header: {
    position: 'relative',
    top: 0,
    left: -64},

});

export default Main;


import React, { Component } from 'react';
import { Button, Easing, Animated, Image,TouchableOpacity, View, Text, TextInput, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import Fire from '../Fire';
import TestImage from '../assets/test_image.png';
import GameBoard from '../assets/5x5_board.png';
import The_O from '../assets/O_piece.png';
import The_X from '../assets/X_piece.png';
import Blank from '../assets/blank_piece.png';
import dismissKeyboard from 'dismissKeyboard';


class Chat extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || 'Chat!',
  });

  constructor(props){
    super(props);

    let setTypes=[];
 
    for (let i=1;i<26;i++){
      setTypes[i]={ type:'UA' };
    }

    setTypes[0]='INTENTIONALLY NOT USED!';

    console.log('>>>>>>> LOADING types in state >>>>>>>>: ',setTypes);
 
    this.state = {

      gameMode: 'Active',
      currentTeam: 'X',
      messages: [],
      types: setTypes,
      stuff:'' 

    }
   
  }
   

  componentDidMount(){

    Fire.shared.on(message => {
  
      //kill keyboard once you send text...
      dismissKeyboard();
 
      console.log('--------------------------------incoming message: ',message);
    
      let newArray=this.state.types;

      //if the state has been loaded...
      //if(this.state){

      let newValue = 0;
 
      for(let i=0;i<message.text.length;i++){
 
        //X move is found
        if(message.text[i].toLowerCase() === 'x' && message.text[i+1].toLowerCase() === 'x' && message.text[i+2].toLowerCase() === 'x'){
 
          console.log('xxx is found');

          //Get 2 digit number
          newValue = (parseInt(message.text[i+3] + message.text[i+4]));

          //Check for 1 digit number
          if(newValue === NaN){
            newValue = (parseInt(message.text[i+3]));
          }

          //No good number found exit
          if(newValue === NaN){
            return;
          }
 
          //Value is good but outside of array range
          if(newValue < 0 || newValue > 25){
            return;
          }

          let newType = {
            type: 'X'
          }

          newArray = this.state.types.map((item,index) => {

            if(index === newValue){

              return newType;

            }else{

              return item;

            }

          });

        }

        //O move is found
        if(message.text[i].toLowerCase() === 'o' && message.text[i+1].toLowerCase() === 'o' && message.text[i+2].toLowerCase() === 'o'){
 
          console.log('ooo is found');

          //Get 2 digit number
          newValue = (parseInt(message.text[i+3] + message.text[i+4]));

          //Check for 1 digit number
          if(newValue === NaN){
            newValue = (parseInt(message.text[i+3]));
          }

          //No good number found exit
          if(newValue === NaN){
            return;
          }
 
          //Value is good but outside of array range
          if(newValue < 0 || newValue > 25){
            return;
          }

          let newType = {
            type: 'O'
          }


          newArray = this.state.types.map((item,index) => {

            if(index === newValue){

              return newType;

            }else{

              return item;

            }

          });

           
  
          //console.log('newArray ',newArray);

           
        }

        //qqq restart the game
        if(message.text[i].toLowerCase() === 'q' && message.text[i+1].toLowerCase() === 'q' && message.text[i+2].toLowerCase() === 'q'){

          for (let i=1;i<26;i++){
            newArray[i]={ type:'UA' };
          }
          
        }
 
      }

      this.setState({

        types: newArray

      })

      console.log('After set state---> ',this.state.types)


      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages,message) 
        
      }))


      
      
    }); 

  };

  componentWillUnmount(){
    console.log('Unmount has happened!');
    Fire.shared.off();
  }

  get user(){
 
    return{
      name: this.props.navigation.state.params.name,
      _id: Fire.shared.uid,
    };

  }
 
render(){

  let stopper = 0;

  //console.log('----->>>> AT RENDER: this.state.types ',this.state.types[1].type);

  if(this.state.gameMode === undefined){stopper = 1;}

  if(this.state.gameMode === 'Active'){stopper = 0;}

  //No State Yet 
  if(stopper === 1) {

    //Render view with no game pieces...
    return(
      <View style={{flex: 1, backgroundColor: 'powderblue'}}>
      
      <Image source={GameBoard} style={styles.GameBoardContainer}/>  
 
      <GiftedChat
        messages={this.state.messages}
        onSend={Fire.shared.send}
        user={this.user}
      />
      
    </View>
    );

  } 
  
  //State is loaded
  if(stopper === 0) {
 
      let setTypes = [];
     
      for (let i=1; i < 26; i++){
       
            if(this.state.types[i].type === undefined){
              setTypes[i] = Blank;
            }
    
            //UA --unassigned
            if(this.state.types[i].type === 'UA'){
              setTypes[i] = Blank;
            }
      
            //X
            if(this.state.types[i].type === 'X'){
              setTypes[i] = The_X;
            }
      
            //Y
            if(this.state.types[i].type === 'O'){
              setTypes[i] = The_O;
            }
           
      }
     
      //console.log('*** ----------------->current state for types: ',this.state.types);
     
      //Render View with game pieces
      return(
        <View style={{flex: 1, backgroundColor: 'powderblue'}}>
          
            <Image source={GameBoard} style={styles.GameBoardContainer}/>  
    
            {/* <Animated.Image source={The_X} style={[this.moveAnimation.getLayout()]}/> */}
            <View style={styles.NewContainer}>
             <Image source={setTypes[1]} style={styles.pos_1}/>
             <Image source={setTypes[2]} style={styles.pos_2}/>
             <Image source={setTypes[3]} style={styles.pos_3}/>
             <Image source={setTypes[4]} style={styles.pos_4}/>
             <Image source={setTypes[5]} style={styles.pos_5}/>
             <Image source={setTypes[6]} style={styles.pos_6}/>
             <Image source={setTypes[7]} style={styles.pos_7}/>
             <Image source={setTypes[8]} style={styles.pos_8}/>
             <Image source={setTypes[9]} style={styles.pos_9}/>
             <Image source={setTypes[10]} style={styles.pos_10}/>
             <Image source={setTypes[11]} style={styles.pos_11}/>
             <Image source={setTypes[12]} style={styles.pos_12}/>
             <Image source={setTypes[13]} style={styles.pos_13}/>
             <Image source={setTypes[14]} style={styles.pos_14}/>
             <Image source={setTypes[15]} style={styles.pos_15}/>
             <Image source={setTypes[16]} style={styles.pos_16}/>
             <Image source={setTypes[17]} style={styles.pos_17}/>
             <Image source={setTypes[18]} style={styles.pos_18}/>
             <Image source={setTypes[19]} style={styles.pos_19}/>
             <Image source={setTypes[20]} style={styles.pos_20}/>
             <Image source={setTypes[21]} style={styles.pos_21}/>
             <Image source={setTypes[22]} style={styles.pos_22}/>
             <Image source={setTypes[23]} style={styles.pos_23}/>
             <Image source={setTypes[24]} style={styles.pos_24}/>
             <Image source={setTypes[25]} style={styles.pos_25}/>
    
            </View>
          
          <GiftedChat
            messages={this.state.messages}
            onSend={Fire.shared.send}
            user={this.user}
          />
          
        </View>
      );
      

  }
    
  
}//render end
 
}//class end

//This sets up the board:
    let testX=[];
    let testY=[];
    let testType=[];
    let holder=[];
   
    for (let i=1;i<26;i++){
 
        //X
        if(i === 1 || i === 6 || i === 11 || i === 16 || i === 21){testX[i]=40;}
        if(i === 2 || i === 7 || i === 12 || i === 17 || i === 22){testX[i]=40 + (49*1);}
        if(i === 3 || i === 8 || i === 13 || i === 18 || i === 23){testX[i]=40 + (49*2);}
        if(i === 4 || i === 9 || i === 14 || i === 19 || i === 24){testX[i]=40 + (49*3);}
        if(i === 5 || i === 10 || i === 15 || i === 20 || i === 25){testX[i]=40 + (49*4);}
  
        //Y
        if(i < 6){testY[i]=40;}
        if(i > 5 && i < 11){testY[i]=40 + (49*1);}
        if(i > 10 && i < 16){testY[i]=40 + (49*2);}
        if(i > 15 && i < 21){testY[i]=40 + (49*3);}
        if(i > 20){testY[i]=40 + (49*4);}
         
        holder[i] = {position: 'absolute',left:testX[i],top:testY[i]};

        //console.log('object #: ',i,' contents: ',holder[i]);
  
    }

     

//console.log('objectTest--------------------------->',holder,holder.index);

const styles = StyleSheet.create({

  GameBoardContainer: {
    position: 'absolute',
    top: 0,
    left: -64}, 
  NewContainer: {
    // position: 'absolute',
    top: -30,
    left: 34,
    flex: 1
  },
  pos_1: holder[1],
  pos_2: holder[2],
  pos_3: holder[3],
  pos_4: holder[4],
  pos_5: holder[5],
  pos_6: holder[6],
  pos_7: holder[7],
  pos_8: holder[8],
  pos_9: holder[9],
  pos_10: holder[10],
  pos_11: holder[11],
  pos_12: holder[12],
  pos_13: holder[13],
  pos_14: holder[14],
  pos_15: holder[15],
  pos_16: holder[16],
  pos_17: holder[17],
  pos_18: holder[18],
  pos_19: holder[19],
  pos_20: holder[20],
  pos_21: holder[21],
  pos_22: holder[22],
  pos_23: holder[23],
  pos_24: holder[24],
  pos_25: holder[25] 

});

export default Chat;
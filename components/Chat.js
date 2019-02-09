
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

    let testX=[];
    let testY=[];
    let testType=[];
    let gamePieces=[];
 
    for (let i=1;i<26;i++){
        gamePieces[i]={type:'UA'};
    }

    //console.log('gamePieces in state: ',gamePieces);
 
    this.state = {

      messages: [],
      gamePieces:gamePieces,
      XO_view: The_X,
      stuff:'',
      inputXY: new Animated.ValueXY({x:500,y:0}) 

    }


    this.moveAnimation = new Animated.ValueXY({ x:500,y:0 })
  

  }
  

  get user(){

    //console.log('Chat.js get user? ',Fire.shared.uid);
    //console.log('Chat.js messages? ',this.state.messages);

    return{
      name: this.props.navigation.state.params.name,
      _id: Fire.shared.uid,
    };

  }

  render(){

    //console.log('Chat.js user?: ',this.user);

    //<View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }} ></View>

    //This will update the view that will render the array of the game pieces positions...
 
    // for(let i=0;i<this.state.X_positions.length;i++){
 
    // }

    //use this to setup views each time
    //const newstuff_1 = [{ transformXY: this.state.gamePieces[1].y }, {transformXY: this.state.gamePieces[1].x}];
    // const newstuff_2 = [{ translateY: this.state.gamePieces[2].y }, {translateX: this.state.gamePieces[2].x}];
    // const newstuff_3 = [{ translateY: this.state.gamePieces[3].y }, {translateX: this.state.gamePieces[3].x}];
    // const newstuff_4 = [{ translateY: this.state.gamePieces[4].y }, {translateX: this.state.gamePieces[4].x}];
    // const newstuff_5 = [{ translateY: this.state.gamePieces[5].y }, {translateX: this.state.gamePieces[5].x}];
    // const newstuff_6 = [{ translateY: this.state.gamePieces[6].y }, {translateX: this.state.gamePieces[6].x}];

     
     

    // let testThing = <Animated.Image source={The_O} style={{transform: newstuff}}/>
 
    // let addView = null;
      


     
    //bigView = <Animated.Image source={this.state.gamePieces[1].type} style={styles.pos_1}/>;

 //<View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>

//No State Yet 
if(this.state.gamePieces[1].type === undefined){

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
if(this.state.gamePieces[1].type !== undefined){

  let setTypes = [];
 
  for (let i=1; i < 26; i++){
   
        //UA --unassigned
        if(this.state.gamePieces[i].type === 'UA'){
          setTypes[i] = Blank;
        }
  
        //X
        if(this.state.gamePieces[i].type === 'X'){
          setTypes[i] = The_X;
        }
  
        //Y
        if(this.state.gamePieces[i].type === 'O'){
          setTypes[i] = The_O;
        }
       
  }

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


    
 
  }

  /*
style={{
            position: 'absolute',
            top: 55,
            bottom: 55,
            left: 255,
            right: 255,
            justifyContent: 'flex-end'}}
  */


  componentDidMount(){
    Fire.shared.on(message => {

      //SPIN STUFF? ----------------->

      // spinValue = new Animated.Value(0)

      // // First set up animation 
      // Animated.timing(
      //     this.spinValue,
      //   {
      //     toValue: 1,
      //     duration: 3000,
      //     easing: Easing.linear
      //   }
      // ).start()
      
      // // Second interpolate beginning and end values (in this case 0 and 1)
      // const spin = this.spinValue.interpolate({
      //   inputRange: [0, 1],
      //   outputRange: ['0deg', '360deg']
      // })

      //SPIN STUFF? ----------------->

      //kill keyboard once you send text...
      dismissKeyboard();

      Animated.spring(this.moveAnimation, {
        toValue: {x: 0, y: 0},
      }).start();
  

      //console.log('--------------------------------incoming message: ',message);

      let newStuff = 'Nothing';
      let newValue = 0;

      for(let i=0;i<message.text.length;i++){

        if(message.text[i] === 'X'){

          //Need to make a new X piece reference...

          // this.setState({

          //   X_positions: [this.this.stateX_positions ...]

          // })

          newStuff = 'X is found';
          newValue = (parseInt(message.text[i+1] + message.text[i+2] + message.text[i+3]));

          //console.log('Y? :',this.moveAnimation.y);

          let currentY = this.moveAnimation.y;

          //console.log('currentY? :',currentY);

          //1
          // let new_X=-93;//COLUMN 1 X
          // let new_Y=-120;//ROW 1 Y

          //2
          // let new_X=-44;//COLUMN 2 X // COLUMNS are 49px increments!
          // let new_Y=-120;//ROW 1 Y // ROWS are 49px increments!

          let new_X=-93;// 
          let new_Y=-71;//ROW 2 Y

 
          Animated.spring(this.moveAnimation, {
            toValue: {x:new_X,y:new_Y},
          }).start();

        }

        // if(message.text[i] === 'Y'){

        //   newStuff = 'Y is found';
        //   newValue = (parseInt(message.text[i+1] + message.text[i+2] + message.text[i+3]));


        //   let currentX = this.moveAnimation.x; 
 
        //   Animated.spring(this.moveAnimation, {
        //     toValue: {x:(0),y:newValue},
        //   }).start();

        // }

        // if(message.text[i] === 'R'){

        //   newStuff = 'R is found';
        //   newValue = parseInt(message.text[i+1]);
 
        //   Animated.spring(this.moveAnimation, {
        //     toValue: {x: 0,y:0},
        //   }).start();

        // }
 
      }

      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages,message)
      })
      
      )

    }) 
  };

  componentWillUnmount(){
    console.log('Unmount has happened!');
    Fire.shared.off();
  }

}

// const testThis = {
//   position: 'absolute',
//   top: 0,
//   bottom: 0,
//   left: -64,
//   right: 0,
// }


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

        console.log('object #: ',i,' contents: ',holder[i]);
  
    }

     

//console.log('objectTest--------------------------->',holder,holder.index);

const styles = StyleSheet.create({

  GameBoardContainer: {
    position: 'absolute',
    top: 0,
    left: -64}, 
  NewContainer: {
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
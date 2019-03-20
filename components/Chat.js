
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
//////// 
  
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
 
    this.state = {

      gameMode: 'Active',
      currentTeam: 'X',
      gameMessage: 'Your move Team X',
      messages: [],
      types: setTypes,
      stuff:'' 

    }
   
  }
   

  componentDidMount(){

    Fire.shared.on(message => {
 
      const types = this.state.types;
      let gameMode = this.state.gameMode;
      let winFlag = 0;
      let teamCheck;//send team type to win section
      let newArray=this.state.types;//array of types of (game pieces) gets changed based player moves
      let newTeam = this.state.currentTeam;
      let newMessage = this.state.gameMessage;
      let newType;
      let winner;

      const messageLength = message.text.length;
       
      //kill keyboard once you send text...
      dismissKeyboard();
    
      const processTurn = (newValue) => {
 
        if(this.state.currentTeam === 'O'){

          newTeam = 'X';
          newMessage = 'Your move Team X...';
          newType = {
            type: 'O'
          }

        }

        if(this.state.currentTeam === 'X'){

          newTeam = 'O';
          newMessage = 'Your move Team O...';
          newType = {
            type: 'X'
          }

        }


        newArray = this.state.types.map((item,index) => {

          if(index === newValue){

            return newType;

          }else{

            return item;

          }

        });
 

      }
     
      //Is there a message that could be a move command?
      //Message Command Scan
      if(messageLength > 2){

        //find first valid command and stop >>
          //restart 'qqq' -- lower case converted
          //move commands ooo1 or ooo01 & xxx1 or xxx01 -- lower case converted

        const ooo = 'ooo';
        const xxx = 'xxx';
        const qqq = 'qqq';

        //used to decide whether to accept an O or X command based on which team is up
        const teamCompare = this.state.currentTeam === 'O'
                            ? ooo
                            : xxx
       
        //Scan message for commands
        for(let i = 0; i < messageLength; i++){
        
        //Scan for --> reset game command
        if(i >= 2 &&
          (
            (message.text[i].toLowerCase()) +
            (message.text[i - 1].toLowerCase()) +
            (message.text[i - 2].toLowerCase()) === qqq
          )
          ){
 
            //reset game type array
            for (let z = 1; z < 26; z++){
              newArray[z]={ type:'UA' };
            }

            //randomly choose 'o' or 'x' to start
            let decider = Math.floor(Math.random() * 2);
  
            if(decider === 0){

              newTeam = 'X';
              newMessage = 'Ok, Team X Goes First!';

            }

            if(decider === 1){

              newTeam = 'O';
              newMessage = 'Ok, Team O Goes First!';

            }

            winFlag = 0;
             
            break
 
          }

        //Scan for --> Move commands = any 'ooo' or 'xxx' + valid 1 or 2 digit numbers
        if(
            gameMode == 'Active' &&
            i >= 3 &&
            ((message.text[i - 1].toLowerCase()) +
            (message.text[i - 2].toLowerCase()) +
            (message.text[i - 3].toLowerCase())) === teamCompare 
          ){
  
            let convert = parseInt(message.text[i]);
            let convert_2 = parseInt(message.text[i + 1]);

            //1 digit number
            if(!isNaN(convert) && (isNaN(convert_2) || convert_2 === undefined)){

              let command = 'ooo' + message.text[i];
               
              //set game token on board
              processTurn(convert);
                
              break

            }

            //2 digit number less than 25
            if(!isNaN(convert) && (!isNaN(convert_2)) && (((convert * 10) +  convert_2) < 26)){
  
                let converSum = ((convert * 10) +  convert_2);

                //set game token on board
                processTurn(converSum);
                 
                break
  
            }
 
        }
  
        }//end of inner loop
  
      }//end of Message Command Scan

      //Detect WIN
  
       
      if(newArray.length > 9){
 
        for(let team = 1; team < 3; team = team + 1){

          if(team === 1){teamCheck = 'X';}
          if(team === 2){teamCheck = 'O';}

          //console.log('team ',team);
 
          for(let i = 0; i < 4; i = i + 1){
  
            //Rows
            if(
              newArray[1 + (i * 5)].type === teamCheck &&
              newArray[2 + (i * 5)].type === teamCheck &&
              newArray[3 + (i * 5)].type === teamCheck &&
              newArray[4 + (i * 5)].type === teamCheck &&
              newArray[5 + (i * 5)].type === teamCheck 
            ){
      
              winner = teamCheck;
              winFlag = 1;
              break
  
            }
  
            //Columns 
            if(
              newArray[1 + i].type === teamCheck &&
              newArray[6 + i].type === teamCheck &&
              newArray[11 + i].type === teamCheck &&
              newArray[16 + i].type === teamCheck &&
              newArray[21 + i].type === teamCheck 
            ){
      
              winner = teamCheck;
              winFlag = 2;
              break

            } 
 
            //Diagonal left to right
            if(
              newArray[1].type === teamCheck &&
              newArray[7].type === teamCheck &&
              newArray[13].type === teamCheck &&
              newArray[19].type === teamCheck &&
              newArray[25].type === teamCheck 
            ){
      
              winner = teamCheck;
              winFlag = 3;
              break
  
            }

            //Diagonal right to left
            if(
              newArray[5].type === teamCheck &&
              newArray[9].type === teamCheck &&
              newArray[13].type === teamCheck &&
              newArray[17].type === teamCheck &&
              newArray[21].type === teamCheck 
            ){
      
              winner = teamCheck;
              winFlag = 3;
              break
  
            }
  
           }//end of WIN Check loop
            
        }
 
      }
       
      //Add win message
      if(winFlag > 0){
 
        //Across win
        if(winFlag === 1){
          
          newMessage = `Team ${this.state.currentTeam} Wins Across! qqq to restart!`;
           
        }

        //Down Win
        if(winFlag === 2){
 
          newMessage = `Team ${this.state.currentTeam} Wins Down! qqq to restart!`;         
            
        }

        //Diagonal win
        if(winFlag === 3){
 
          newMessage = `Team ${this.state.currentTeam} Wins Diagonally! qqq to restart!`;         
            
        }

        gameMode = 'Win'; 

      }

      if(winFlag === 0){

        gameMode = 'Active';

      }


      this.setState({

        gameMode: gameMode,
        currentTeam: newTeam,
        gameMessage: newMessage,
        types: newArray

      })
 
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages,message) 
        
      }))


       
      //

      
      
    }); 
 
  };

  componentWillUnmount(){
     
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
  
  if(this.state.gameMode === undefined){stopper = 1;}

  if(this.state.gameMode === 'Active' || this.state.gameMode === 'Win'){stopper = 0;}

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
             <View style={styles.posText}>
              <Text style={styles.larger}>{this.state.gameMessage}</Text></View>
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

//This sets up the board and game pieces and detects a win:
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

         
        
 
    }
  
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
  posText: {
    position: 'absolute',
    top: testY[25] + 49,
    left: testX[1] + 32,
    textAlign: 'center' // <-- the magic
  },
  larger: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 0,
    marginLeft: -60,
    width: 300 
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
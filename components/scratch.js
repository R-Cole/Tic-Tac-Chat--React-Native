//maybe 3 digit command
if((i + 3) < messageLength &&
(message.text[i].toLowerCase() === 'o') &&
(message.text[i + 1].toLowerCase() === 'o') &&
(message.text[i + 2].toLowerCase() === 'o') 
){

  let convert = parseInt(message.text[i + 3]);

  if(!isNaN(convert)){

    //command so far
    command = message.text[i].toLowerCase() + 
              message.text[i + 1].toLowerCase() + 
              message.text[i + 2].toLowerCase() + 
              message.text[i + 3];

    //maybe 4 digit command
    if((i + 4) < messageLength){
      
      

      if(
        (message.text[i].toLowerCase() === 'o') &&
        (message.text[i+1].toLowerCase() === 'o') &&
        (message.text[i+2].toLowerCase() === 'o')
        ){

          command = command + convert_2;

          let convert_1 = parseInt(message.text[i + 3]);
          let convert_2 = parseInt(message.text[i + 4]);

          if(!isNaN(convert_1)  && !isNaN(convert_2)){

            console.log('this is the 4 digit command: ',command);
            break

          }

          

      }

    }


    console.log('this is the 3 digit command: ',command);
    break


}


}// end of new test loop




//old loop



        //message is right length for 3 digit move command
        if((i + 3) < message.text.length){

          console.log('3 test passed!');

          //Scan for xxx or ooo and number 

          //X move is found
          if(this.state.currentTeam === 'X' &&
          message.text[i].toLowerCase() === 'x' &&
          message.text[i+1].toLowerCase() === 'x' &&
          message.text[i+2].toLowerCase() === 'x'){
 
          console.log('xxx is found');

          //Get 1 digit number
          newValue = (message.text[i+3]);

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

          newTeam = 'O';
          newMessage = 'Your move O Team';

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
        if(this.state.currentTeam === 'O' &&
        message.text[i].toLowerCase() === 'o' &&
        message.text[i+1].toLowerCase() === 'o' &&
        message.text[i+2].toLowerCase() === 'o'){
 
          console.log('ooo is found');

          //Get 1 digit number
          newValue = (message.text[i+3]);

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

          newTeam = 'X';
          newMessage = 'Your move X Team';

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
 
        }
 
        }
 
        //message is right length for a 4 digit move command 
        if((i + 4) < message.text.length){

          console.log('4 test passed!');

          //Scan for xxx or ooo and number 

          //X move is found
          if(this.state.currentTeam === 'X' &&
          message.text[i].toLowerCase() === 'x' &&
          message.text[i+1].toLowerCase() === 'x' &&
          message.text[i+2].toLowerCase() === 'x'){
 
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

          newTeam = 'O';
          newMessage = 'Your move O Team';

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
        if(this.state.currentTeam === 'O' &&
        message.text[i].toLowerCase() === 'o' &&
        message.text[i+1].toLowerCase() === 'o' &&
        message.text[i+2].toLowerCase() === 'o'){
 
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

          newTeam = 'X';
          newMessage = 'Your move X Team';

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
 
        }



        }
  
        //scan for restart
        if((i + 2) < message.text.length){

        //qqq restart the game
        if(message.text.length >= 2 &&
          message.text[i].toLowerCase() === 'q' &&
          message.text[i+1].toLowerCase() === 'q' &&
          message.text[i+2].toLowerCase() === 'q'
          ){

          for (let z = 1; z < 26; z++){
            newArray[z]={ type:'UA' };
          }

          let decider = Math.floor(Math.random() * 1);

          if(decider === 0){

            newTeam = 'X';
            newMessage = 'Ok Team X You Go First!';

          }

          if(decider === 1){

            newTeam = 'O';
            newMessage = 'Ok Team O You Go First!';

          }
  
          return;
          
        }



        }

       
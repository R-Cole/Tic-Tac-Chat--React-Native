# REACT NATIVE Flex Week Project

My loose ideas going into this week were to work with things I hadn't worked with during our React section. The areas I was thinking about delving into were game making, graphics, animation, sound manipulation, neural networks, and data exchange via users.

Early on I found a chat tutorial that involved using react native and the giftedchat library utilizing the firebase real-time database system that Ray had mentioned.
I settled on an idea of some sort of texting game/analyzer combo app. 

I was able to set anonymous user login and texting with data storage and a 5x5 tic-tac-toe game that can be played via texted instructions.
The tic-tac-toe game is really just a placeholder for a better type game but I wanted to get the basic implementation of multiple users interacting via text in an ongoing game that is updated and stored in local state. Very cool to see it on two devices interacting.

## User Log-in:                
![](assets/login.png) 

## Chat game screen:
![](assets/chat_game.png)
 
My future vision for this app would be to have a few mini games and analyzers to choose from. The mini games would take simple commands as seen in the current tic-tac-toe game. Some games could involve drawing together or building somethign together. The analyzer option would involve using the JS.brain neural network library to do comparisons of texts. The sample I found as reference was to train the network to distinguish between texts from Kim Kardashian and Donald Trump. So you could train the app to compare yourself and whoever you wanted, ie: when you type a text the app returns how similar your text is to whoever you have trained it to compare.




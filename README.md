# The Slacker Quiz
A mobile game inspired by the movie Slacker by Richard Linklater.
## Instructions
To play a working version of the game, go to [slacker-server.herokuapp.com](https://slacker-server.herokuapp.com/). 
For best results, open the developer tools in your browser and use mobile device mode.
### To run locally
The server is included but needs a working .config file in order to work properly. A template is provided.

The mobile app is configured to use the sample server from above and can be used after the following is completed.
```
git clone https://github.com/rodmachen/slacker-movie-quiz.git
cd slacker-movie-quiz // open folder
npm install -g cordova ionic // globally install mobile app dependencies
npm install // install server dependencies (optional)
cd client // open mobile app folder
npm install // install mobile app dependencies
ionic serve // launches the app on localhost
```

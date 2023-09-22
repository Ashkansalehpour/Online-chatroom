// server management scripts

/*
* Online chatroom
* Contributors:  Ashkan Salehpour
* Description:  A chat platform written with the socket.io library, which gives you the ability to chat with several users by connecting to one host, and they also have the ability to connect to different rooms for separate chatting space. 
* Technology:  
Programming Languages:

*JavaScript: Used for both client-side and server-side development.
*Node.js: A JavaScript runtime for server-side code.
*HTML/CSS: For building the user interface and styling.

Front-End Frameworks/Libraries:

*Socket.io: For enabling real-time communication between the client and server.
*Moment.js: For working with dates and times in a user-friendly way (optional, as it has been deprecated in favor of native JavaScript Date methods).
Back-End Frameworks:

*Express.js: A popular Node.js framework for building web applications and APIs.

* How to use :
 * 1. Open your Terminal (Between 'Run' and 'Help' option in top of the page)
 * 2. type ` $npm run dev ` 
 * 3. Enjoy :)

* Create Date: 1402.6.29
*/



// IMPORT required modules :

// Variables 
const express = require('express'); // create web server and handle HTTP requests
const http = require('http'); // Create HTTP server
const path = require('path'); // used to work with files and directory Path
const app = express(); /* 
express() is function provided by Express.js framework.
When you call it return an Express Application
*/
const server = http.createServer(app);
/*
    * Creating and HTTP server using Node.js and we connect it wit app (express.js).
    * http.createServer(app) is a method that creates an HTTP server and it takes an Express app as it's argument.
    * It sets up and HTTP server with Express app.

*/
const socketIo = require('socket.io'); // creating instance communication future

const io = socketIo(server); //Initialize Socket.io with the server

const formatMessage = require('./utils/messages') /* 
* importing module which is name formatMessage in this file : ./utils/messages
* require() is function is Node.js is used to load modules.
* message represent messages.js
*formMessage is now holds the value of whatever is exported from the 'messages.js' module
*/

const { userJoining, getCurrentUserName, userLeftChat, getRoomUsers } = require('./utils/users') // Massage handler which we can tell user information about chat , users , rooms 

const adminName = 'Admin'; // admin Name

/* 
* app.use() is an Express method used to connect server to front
* They Can intercept and process incoming HTTP requests and outgoing responses . 
* express.static() is provided for represented static files (typically files that don't require any special processing on the server and can be served directly to clients.)
* (path.join(__dirname, 'public')) is connect a path to public directory by joining __dirname (__dirname: is Node.js variable representing directory name of the current module)
* So, when a client makes an HTTP request for a static file Express will look in the 'public' directory and serve the requested file if it exists.
*/
app.use(express.static(path.join(__dirname, 'public')));
/*
* The code you've provided is a part of an event handler for the 'connection' event in a Socket.io based chat application.

* whenever a new client connects to the server this code will run
*/
// io.on('connection', socket => { ... }) sets up a listener for the 'connection' event, which occurs whenever a new client connects to the Socket.io server.

// The callback function inside this event listener is perform when a connection is start, and it receives a socket object representing the connection to the client.
io.on('connection', socket => {
    //socket.on('joinRoom', ({ username, room }) => { ... }) listens for the 'joinRoom' event, which is a custom event that the client can emit when they want to join a chat room it includes username and room values
    socket.on('joinRoom', ({ username, room }) => {

        // takes the socket.id, username, and room as arguments and returns a user object that represents the user's connection to the chat room.
        const user = userJoining(socket.id, username, room);
        socket.join(user.room);

        // Welcome to users joining chat
        //socket.emit() method to send a 'message' event with a formatted welcome message. 
        // adminName is variable which we set in top and it show admin name to say welcome to user
        socket.emit('message', formatMessage(adminName, 'Welcome to chat room :)'));

        // The message is again formatted using the formatMessage function, and it is sent to the room using socket.to(user.room).emit() to exclude the user who just joined from receiving their own welcome message.
        socket.to(user.room).emit('message', formatMessage(adminName, `${user.username} join the chat , say HI !`));

        // sends information about the users currently in the chat room to all clients in that room.
        // It emits a custom event 'roomUsers' with data that includes the room name and a list of users in that room, obtained from the getRoomUsers function.
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        })
    });



    /* 
    *event handler that runs when a client disconnects from the Socket.io server.
    *'disconnect' event, which is automatically triggered when a client's connection is closed the chat
    * When a client disconnects, this function is work with 'disconnect' event listener
    * 
    */
    socket.on('disconnect', () => {
        // it called  userLeftChat function when the user left the chat
        // socket.id give information about the user left the chat 
        const user = userLeftChat(socket.id);

        //the if condition representing if the user disconnect from chat , show us the message
        if (user) {
            // Send message to all users in the same room chat and inform that user has left the chat.
            // Use io.to() to send (emit) left message to all the users and it includes username of that user
            io.to(user.room).emit('message', formatMessage(adminName, `${user.username} has left the chat :(`));
            // 'roomUsers' along with data that includes the room name and a list of users in that room.
            // information is obtained from the getRoomUsers function, which is responsible for providing a list of users in a specific chat room.
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            })
        }

    });

    // When a user send a message , 'chatMessage' inform that a message sent.


    // socket.on('chatMessage', (msg) => { ... }) sets up an event listener for the 'chatMessage' event. When a user emit this event, the callback function is inform the received message (msg).
    socket.on('chatMessage', (msg) => {

        // get username id from user who sent message
        const user = getCurrentUserName(socket.id); //getCurrentUserName is to retrieve information about the current user based on their socket.id. 
        io.to(user.room).emit('message', formatMessage(user.username, msg)); /*
        * emits a 'message' event to all users in the same chat room as the sender.
        
        *io.to(user.room) part of the code uses the io.to() method of Socket.io to specify the room to which the message should be sent. 

        *using the formatMessage function to format the message before sending it.
        */
    });

});

//declares a constant named PORT and assigns it a value.
const PORT = process.env.PORT || 3000;

// tells the server to listen on the specified port, which is stored in the PORT constant.

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
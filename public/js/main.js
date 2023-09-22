// Main scripts

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



const chatForm = document.getElementById('chat-form'); // Represents the form where users can input chat messages.
const chatMessage = document.querySelector('.chat-messages'); // Represents the container for displaying chat messages.
const roomName = document.getElementById('room-name'); // Represents the element for displaying the current chat room's name.
const userList = document.getElementById('users'); //Represents the element for displaying the list of users in the chat room.


//Qs.parse() to extract the username and room parameters from the URL's query string. It removes the query string prefix using { ignoreQueryPrefix: true }.
//These values (username , room)are typically obtained from the URL when a user joins a chat room. If no values are found, default values of an empty string are assigned to username and room.
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true }) || { username: '', room: '' };



//The script initializes a Socket.io client by calling io() and assigns the resulting socket object to the socket variable.
const socket = io();

//The script send a 'joinRoom' event to the server, providing the username and room as data. This is done to join a specific chat room with the given username.
socket.emit('joinRoom', { username, room });

socket.on('roomUsers', ({ room, users }) => {
    // When the server emits a 'roomUsers' event, indicating that the list of users in the room has changed, the client-side code updates the room name and user list by calling the showRoomName and showUserName functions.
    showRoomName(room);
    showUserName(users);
});

// When the server send a 'message' event, which represents a chat message from another user or the server itself, the client-side code
socket.on('message', message => {
    // Calls the outputMessage function to display the message in the chat interface.
    outputMessage(message);

    // Scrolls the chat message container to the bottom to show the new message.
    chatMessage.scrollTop = chatMessage.scrollHeight;
});

// vent handler for the submission of a chat message form.
//'submit' event on the chatForm element and performs various actions when a user submits a message. 
chatForm.addEventListener('submit', (e) => { //When a user submits the form the callback function enclosed in (e) => { ... } is executed.

    e.preventDefault(); // prevents the default behavior of the form submission, which is to reload the page
    //e.target.elements.msg.value ,extracts the text of the message from the form input field.
    const msg = e.target.elements.msg.value;
    // This line sends a 'chatMessage' event to the server using the socket object. It sends the msg (message text) as data to the server. Essentially, it notifies the server that the user has sent a chat message.
    socket.emit('chatMessage', msg);

    // sets the focus back to the input field, allowing the user to start typing their next message without having to click on the input field again. 
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();

});

// create a new message element in the chat interface. It takes a message object as an argument and inserts it into the chat message container as a new chat bubble.
//takes a message object as input, which likely contains information about the message, such as the sender's username, the message text, and the timestamp of the message. 
function outputMessage(message) {
    const div = document.createElement("div"); // creates a new <div> 
    div.classList.add('message'); // adds a CSS class named 'message' to the newly created <div>.
    //create the structure and content of the chat message , getting username and current time to show time of the message
    div.innerHTML = ` <p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
    ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div); // the chat message, is appended to the chat messages container in the HTML 
}

// updating specific elements in the (DOM) 

//showRoomName used to display the chat room's name in the user interface. It takes one parameter, room, which is a string representing the name or identifier of the chat room.
function showRoomName(room) {
    roomName.innerText = room; //updates the text content of the roomName element to display the current chat room's name.

}
// showUserName display the list of usernames (users in the chat room) 

function showUserName(users) {
    /* 
    * uses the map method to iterate over the users array and create an array of HTML list items with each user's username.
    * used to concatenate all the generated HTML list items into a single string.
    * userList.innerHTML , replaces the existing user list with the updated list of usernames, displaying the current users in the chat room.
    */
    userList.innerHTML = users.map(user => `<li>${user.username}</li>`).join('');
}

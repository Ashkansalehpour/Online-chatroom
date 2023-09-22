// Message management scripts

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



const moment = require('moment'); // imports the moment library, which is commonly used for working with dates and times 

//username: Represents the username of the sender of the chat message.
//text: Contains the text of the chat message.
function formatMessage(username , text) {
    return {
        username,
        text,
        time: moment().format('h:mm a') //It uses the 'moment' library to generate a formatted timestamp in the 'h:mm a' format. Here's what each part of the timestamp means
    }
}
// export module
module.exports = formatMessage;
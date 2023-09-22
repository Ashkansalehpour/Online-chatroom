// User management scripts


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



const users = [];

// Join users to chat

//This function is used to add a user to the chat.
/*
* id: The unique identifier for the user (socket ID identifier)
* username: The username of the user.
* room: The chat room the user is joining.

*/
function userJoining(id, username, room) {
    // It combines the id, username, and room values into a single object named user.
    const user = { id, username, room };
    // user object is added to an array named users.
    users.push(user);
    // returns user information when the user join the chat
    return user
}

// This function is used to get the current user's information based on their id. 

function getCurrentUserName(id) {
    /* find() on the users array to search for a user whose id matches the provided id.
    *users: This is an array containing information about all the users in the chat application.
    *checks if the id property of each user object in the array matches the provided id.
    *user => user.id === id , checks if the id property of each user object in the array matches the provided id.
    */
    return users.find(user => user.id === id);
}

// users information who left the chat 


function userLeftChat(id) {
    /*
    * use the findIndex method on the users array to find the index of the user whose id matches the provided id.
    * findIndex() checks if the id property of each user object in the array matches the provided id which is in users array.
    * user => user.id === id ,compare the id of each user in the array with the provided id. 
    */
    const index = users.findIndex(user => user.id === id);

    //index variable is not equal to -1, which means a user with the specified id was found in the users array.
    if (index !== -1) {
        //users.splice(index, 1) modify the users array.
        // [0]splice() ,returns an array containing the removed elements.
        return users.splice(index, 1)[0];
    }
    //If it finds a matching user, it removes that user from the array and returns their user object. If no matching user is found, it returns undefined. 
}

// represents the name or users of a chat room.
function getRoomUsers(room) {
    /*
    * collects all the users who are part of a particular chat room.
    * (user => user.room === room),It returns an array containing all the user objects for which the callback function returns true.
    */
    return users.filter(user => user.room === room);
}
// export modules we made to server.js
module.exports = {
    userJoining,
    getCurrentUserName,
    userLeftChat,
    getRoomUsers
};
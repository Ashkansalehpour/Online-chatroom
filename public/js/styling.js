// Jquery Styling with JavaScript

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
 1. Open your Terminal (Between 'Run' and 'Help' option in top of the page)
 2. type ` $npm run dev ` 
 3. Enjoy :)
* Create Date: 1402.6.29
*/



// This code uses jQuery to select an element with the ID "room" and then iterates over each instance of that element. This suggests that there might be multiple <select> elements with the ID "room" on the page.
$("#room").each(function () {
    // In this line, the code is retrieving the class, id, and name attributes of the currently iterated <select> element and storing them in corresponding variables.
    let classes = $(this).attr("class"),
        id = $(this).attr("id"),
        name = $(this).attr("name");
    // Here, a variable called template is created, which is initialized with an opening <div> tag. The class attribute of the <select> element is applied to this <div>.
    let template = '<div class="' + classes + '">'; //In this line, an additional <span> element is appended to the template. This <span> element has the ID "room-trigger," a class "custom-select-trigger," and its content is set to the placeholder attribute of the <select> element.
    template += '<span id="room-trigger" class="custom-select-trigger">' + $(this).attr("placeholder") + '</span>';
    // Another <div> element with the class "custom-options" is added to the template. This will presumably hold the selectable options of the custom select.
    template += '<div class="custom-options">';
    /*
    * Here, the code is searching for <option> elements within the current <select> element ($(this)) and iterating over them.
    
    *  For each <option> element found, a corresponding <span> element with a class "custom-option" is added to the template. This <span> element also gets the class attribute from the <option>, 
    */
    $(this).find("option").each(function () {
        //  attribute from the <option>'s value attribute, and its content is set to the text within the <option>.
        template += '<span class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
    });
    //  Finally, the template is closed with closing </div> tags for both the "custom-options" <div> and the main container <div>.
    template += '</div></div>';

    // After building the custom select elements in the template, the code wraps the original <select> element with a new <div> element with the class "custom-select-wrapper." This effectively hides the original <select> element.

    $(this).wrap('<div class="custom-select-wrapper"></div>');
    $(this).hide(); //This line hides the original <select> element. It's now wrapped within the custom select.
    $(this).after(template); // Finally, the template (containing the custom select structure) is inserted after the hidden <select> element in the document.
});

// his code attaches a hover event to the first element with the class "custom-option" that is the first child of its parent. When this element is hovered over, it adds a class "option-hover" to its parent with the class "custom-options." When the hover ends, it removes the "option-hover" class from the parent. This is likely used for styling the options when hovered.
$(".custom-option:first-of-type").hover(function () {
    $(this).parents(".custom-options").addClass("option-hover");
}, function () {
    $(this).parents(".custom-options").removeClass("option-hover");
});

/* 

* This code attaches a click event to elements with the class "custom-select-trigger." When one of these elements is clicked, it performs the following actions

* It prevents the default behavior of the click event.

* It closes any previously opened custom select by removing the "opened" class from elements with the class "custom-select."

* It toggles the "opened" class on the parent with the class "custom-select" of the clicked element.

*It stops the event propagation to prevent it from reaching the <html> element.

*/


$(".custom-select-trigger").on("click", function (event) {
    $('html').one('click', function () {
        $("#room").removeClass("opened");
    });
    $(this).parents(".custom-select").toggleClass("opened");
    event.stopPropagation();
});

/* 

* This code attaches a click event to elements with the class "custom-option." When one of these elements is clicked, it performs the following actions:

* It sets the value of the <select> element (found within the same "custom-select-wrapper") to the data-value attribute of the clicked option. This effectively changes the selected option in the underlying <select>.

* It removes the "selection" class from all other elements with the class "custom-option" within the same "custom-options" container and adds the "selection" class to the clicked option.

* It removes the "opened" class from the parent "custom-select" element.

* It updates the text content of the custom select trigger (the element with the class "custom-select-trigger") to match the text of the clicked option.

*/

$(".custom-option").on("click", function () {
    $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
    $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
    $(this).addClass("selection");
    $(this).parents(".custom-select").removeClass("opened");
    $(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text());
});


/* 

* This code runs when the document is fully loaded and ready. It initializes the custom select:

* It selects the <select> element with the ID "room."

* It gets the text of the initially selected option and sets it as the text content of the custom select trigger (element with the ID "room-trigger").

* It adds an event listener to the "roomSelect" element to update the trigger text when the selection changes.

*/

$(document).ready(function () {
    // Get the select element
    let roomSelect = $("#room");

    // Get the initial selected option text and set it in the span
    let initialSelectedOptionText = roomSelect.find("option:selected").text();
    $("#room-trigger").text(initialSelectedOptionText);

    // Update the span text when the selection changes
    roomSelect.change(function () {
        let selectedOptionText = $(this).find("option:selected").text();
        $("#room-trigger").text(selectedOptionText);
    });

    // Set the initial placeholder text
    $("#room-trigger").text("Select your Room");
});

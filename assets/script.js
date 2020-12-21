
//  DEFINE VARIABLES
//  The actual format for a 24hr clock
let currentTime = moment().format("HH");
// parse the current time so we can compare it with another number later
let currentTimeInt = parseInt(currentTime);
let saveBtn = $(".saveBtn");

$(document).ready(function () {

    // call the function to populate the input values with stored data
    renderPlans();


    //  This will add the current date

    // variable set to the current day. Formatting info found at https://momentjs.com/docs/
    let currentDay = moment().format("dddd, MMMM Do");
    // set the text of the p tag as the current day
    $("#currentDay").text(currentDay);

    // THIS WILL set the data attributes to the hour input element
    // *** Note later we will change the class on defined element based on whether the represented time is > and / or < the current time.
    $("#9Row").attr("data-time", moment("9:00 am", "h:mm a").format("HH"));
    $("#10Row").attr("data-time", moment("10:00 am", "h:mm a").format("HH"));
    $("#11Row").attr("data-time", moment("11:00 am", "h:mm a").format("HH"));
    $("#12Row").attr("data-time", moment("12:00 pm", "h:mm a").format("HH"));
    $("#1Row").attr("data-time", moment("1:00 pm", "h:mm a").format("HH"));
    $("#2Row").attr("data-time", moment("2:00 pm", "h:mm a").format("HH"));
    $("#3Row").attr("data-time", moment("3:00 pm", "h:mm a").format("HH"));
    $("#4Row").attr("data-time", moment("4:00 pm", "h:mm a").format("HH"));
    $("#5Row").attr("data-time", moment("5:00 pm", "h:mm a").format("HH"));



    //  CHANGE INPUT BOX COLOR BASED ON TIME OF DAY

    // set a variable imputTime to represent the input block's corresponding time with a for loop
    for (let j = 1; j <= 12; j++) {
        let inputTime = $("#" + j + "Row").attr("data-time");
        let inputTimeInt = parseInt(inputTime);
        console.log(inputTimeInt);

        // Set color styling based on comparisons between the currentTimeInt and the inputTimeInt
        if (currentTimeInt === inputTimeInt) {
            $("#" + j + "Row").addClass("present");

        }

        if (currentTimeInt > inputTimeInt) {
            $("#" + j + "Row").addClass("past");
        }

        if (currentTimeInt < inputTimeInt) {
            $("#" + j + "Row").addClass("future");
        }

    }
    saveBtn.on("mouseenter", function () {
        $(this).addClass('hover');
    });

    saveBtn.on("mouseleave", function () {
        $(this).removeClass('hover');
    });


    //BUTTON CLICK

    saveBtn.on("click", function () {
        // set a variable to select the clicked-on-button's data-hour attribute which we set in the HTML
        let hour = $(this).attr("data-hour");

        // define and set a variable to select the value of the user's "plan" (input) at a particular hour
        let plan = $("#" + hour + "Row").val();

        // load & save eacg of the hour entry blocks plan to our local storage
        localStorage.setItem(hour, plan);

    });


    //  Function to retrieve stored user inputs from local storage and populate the hour's input value with them
    function renderPlans() {

        // THIS Will begin at 1 AS 1 is the earliest or lowest possible hour
        // ALL Hours will account for: 1, 2, 3, 4, 5, 9, 10, 11, 12
        for (let i = 1; i <= 12; i++) {

            $("#" + i + "Row").val(localStorage.getItem(i));
        }
    }


});

const containerEl = $('.container')
let rowEl; //Rows for each our of the day 
const hoursPerDay = 10;
let currentTimeEl;
let time = [];
let hourColEl;
let inputDescEl;
let saveBtn;
let saveColEl;
let descColEl;
let index = [];

//setting up today's date and displaying it on the page
var todayEl =  moment().format("dddd, MMMM Do, YYYY");
$("#currentDay").append(todayEl);

//get the number of hours in a work day
const timeInADay = () => {
    var formattedTime = [];
    time = formattedTime;
    for (i = 0; i < hoursPerDay; i++) {
        var thatTime = (6 + i);
        formattedTime.push((moment().startOf('day').add(thatTime, 'hours').format("HH:mm A")));
    }

}

//render calendar
const renderCalendar = () => {
    //
    for (i = 0; i < hoursPerDay; i++) {

        //dynamically rendering the to do tasks
        rowEl = $('<div>').attr("class", "row");
        hourColEl = $('<div>' + time[i] + '</div>').attr("class", "col-lg-1 col-sm-2 col-xs-2 hour");
        descColEl = $('<div>').attr("class", "col-lg-10 col-sm-8 col-xs-8");

        //input element for description 
        inputDescEl = $('<textarea>').attr('value', "").attr("class", "description").attr("id", time[i]);
        //push the id 
        index.push(inputDescEl.attr("id"));

        //save button 
        saveColEl = $('<div>').attr("class", "col-lg-1 col-sm-2 col-xs-2")
        saveBtn = $('<button>').attr("class", "saveBtn").attr("id", time[i]).attr("type", "submit").text("💾");
        // saveBtn = $("<span>")
        //  .addClass("oi oi-check")
        //  .text("Save")
        // $(".saveBtn").html('<img src="/open-iconic/svg/check.svg">');
        
        //append the input element to the Description element
        descColEl.append(inputDescEl);
        //append the save button to the save element
        saveColEl.append(saveBtn);

        //append the hour, description and save element to the row
        rowEl.append(hourColEl);
        rowEl.append(descColEl);
        rowEl.append(saveColEl);

        //append the row to the container 
        containerEl.append(rowEl);
    }
    $(document).on("click", ".saveBtn", saveTask);
    
}

function saveTask (event) {
    event.preventDefault()
    var taskInput = $(this).parent().parent().find(".description", ['textarea'])[0].value
    var time = $(this).parent().parent().find(".description", ['textarea'])[0].id;
    console.log(time);
    console.log(taskInput);
    localStorage.setItem(time, taskInput);
}

//determine current time
const currentTime = () => {
    currentTimeEl = moment().format("HH:mm A");
    const timeArea = $('textarea').get();
    let getTask;
    timeArea.forEach(timeDesc => {
       var timeId = parseInt(timeDesc.id);
         
        //check if the time is past
         if (parseInt(currentTimeEl) > timeId) {
             timeDesc.classList.value = "description past";
             getTask = localStorage.getItem(timeDesc.id)
             console.log(getTask);
            timeDesc.value = getTask;
        }
        //check if the time is future
         else if (parseInt(currentTimeEl) < timeId) {
             timeDesc.classList.value = "description future";
             getTask = localStorage.getItem(timeDesc.id)
            console.log(getTask);
             timeDesc.value = getTask;
         }
         //check if it is the current time
         else {
            timeDesc.classList.value = "description present";
            getTask = localStorage.getItem(timeDesc.id)
            //console.log(getTask);
           timeDesc.value = getTask;
        } 
    });
};


timeInADay();
renderCalendar();
console.log(time);
currentTime();
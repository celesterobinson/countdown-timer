let errorMessageSpan = document.getElementById("error_message");
let submitButton = document.getElementById("submit");
let cardGroup = document.getElementById("cards");
let globalDateRegex = /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/g;
let globalTimeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/g;

submitButton.addEventListener("click", (event) => {
  event.preventDefault();

  let eventName = document.getElementById("event_name").value;
  let eventDate = document.getElementById("event_date").value;
  let eventTime = document.getElementById("event_time").value;

  errorMessageSpan.textContent = "";
  validateFormData(eventName, eventDate, eventTime);
});

function validateFormData(eventName, eventDate, eventTime) {
  let isValidEventDate = eventDate.match(globalDateRegex) !== null;
  let isValidEventTime = eventTime.match(globalTimeRegex) !== null;

  if (!eventName && !eventDate) {
    addErrorMessage("Please enter an event name and date.");
  } else if (!eventName) {
    addErrorMessage("Please enter an event name.");
  } else if (!eventDate) {
    addErrorMessage("Please enter an event date.");
  } else if (!isValidEventDate) {
    addErrorMessage("Please enter a valid event date.");
  } else if (eventTime && !isValidEventTime) {
    addErrorMessage("Please enter a valid event time.");
  } else {
    createNewEventCard(eventName, eventDate, eventTime);
  }
}

function addErrorMessage(errorMessage) {
  errorMessageSpan.textContent = errorMessage;
}

function createNewEventCard(eventName, eventDate, eventTime = "00:00") {
  // Clear form
  document.getElementById("event_name").value = "";
  document.getElementById("event_date").value = "";
  document.getElementById("event_time").value = "";

  // Card related variables
  let newCard = document.createElement("div");
  let eventCardName = document.createElement("h1");
  let eventNameText = document.createTextNode(eventName);

  // Time related variables
  let eventDateTime = new Date(`${eventDate} ${eventTime}`);
  let daysLeft = document.createElement("h2");
  daysLeft.id = `${eventName}_days`;
  let hoursLeft = document.createElement("h2");
  hoursLeft.id = `${eventName}_hours`;
  let minutesLeft = document.createElement("h2");
  minutesLeft.id = `${eventName}_minutes`;
  let secondsLeft = document.createElement("h2");
  secondsLeft.id = `${eventName}_seconds`;
  newCard.className = "card eventCard";
  eventCardName.appendChild(eventNameText);
  newCard.appendChild(eventCardName);
  newCard.appendChild(daysLeft);
  newCard.appendChild(hoursLeft);
  newCard.appendChild(minutesLeft);
  newCard.appendChild(secondsLeft);

  let countdown = setInterval(() => {
    let currentTime = new Date().getTime();
    let timeRemaining = eventDateTime - currentTime;
    let days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    if (timeRemaining < 0) {
      clearInterval(countdown);
      countDownComplete(eventName, newCard);
    }

    updateCards(eventName, { days, hours, minutes, seconds });
  }, 1000);

  cardGroup.appendChild(newCard);
}

function countDownComplete(eventName, card) {
  alert(`"${eventName}" is here!`);

  document.getElementById(`${eventName}_days`).remove();
  document.getElementById(`${eventName}_hours`).remove();
  document.getElementById(`${eventName}_minutes`).remove();
  document.getElementById(`${eventName}_seconds`).remove();
  let countdownComplete = document.createElement("h2");
  countdownComplete.className = "countdown_complete";
  countdownComplete.innerHTML = "Your event has arrived!";
  card.appendChild(countdownComplete);
}

function updateCards(eventName, time) {
  document.getElementById(`${eventName}_days`).innerHTML = `${time.days} days`;
  document.getElementById(`${eventName}_hours`).innerHTML = `${time.hours} hours`;
  document.getElementById(`${eventName}_minutes`).innerHTML = `${time.minutes} minutes`;
  document.getElementById(`${eventName}_seconds`).innerHTML = `${time.seconds} seconds`;
}

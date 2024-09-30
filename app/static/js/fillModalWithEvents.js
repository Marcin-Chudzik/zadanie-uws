function fillModalWithEvents(event) {
  // Filling up modal with an events data
  let modalBody = document.querySelector(".modal-body");
  
  // Clearing modal body from the previous event data and adding the new one
  modalBody.innerHTML = "";

  let calendarDay = document.getElementById(event.delegateTarget.dataset.day);
  let dayEvents = calendarDay
    .querySelector(".container .calendar-card-events")
    .querySelectorAll("button");

  dayEvents.forEach((event) => {
    let eventClone = event.cloneNode(true)
    
    eventClone.addEventListener("click", fillOffCanvasWithEventData);
    modalBody.appendChild(eventClone);
  });
}

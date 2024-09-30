// Adding events data to the event day cards in the calendar
function loadEventsToCalendar(events) {
  events.forEach((event) => {
    // Caching image to avoid opening the offcanvas with unloaded image
    let cacheImg = new Image();
    fullUrl = `https://rekrutacja.teamwsuws.pl/${event.image_url}`;
    cacheImg.src = fullUrl;
    event.image_url = fullUrl;

    // Formatting time to correct state
    let eventDate = new Date(event.start_time);
    let month = eventDate.getMonth();
    let day = eventDate.getDay();
    let hours = eventDate.getHours();
    let minutes = eventDate.getMinutes();

    month = month < 10 ? "0" + month : month;
    fullDay = day < 10 ? "0" + day : day;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    let eventTime = `${hours}:${minutes}`;

    // Overwritting the event start time to usable format and add the date of event
    event.start_time = eventTime;
    event.date = `${fullDay}.${month}.${eventDate.getFullYear()}`;

    let calendarDay = document.getElementById(`day-${day}`);
    let eventsContainer = calendarDay.querySelector(
      ".container .calendar-card-events"
    );
    let eventBadge = document.createElement("button");

    // Saving event detailed data to the session storage.
    let storageKey = `${event.id}:${event.name}`;
    sessionStorage.setItem(storageKey, JSON.stringify(event));

    // Set event listener to fill up the offcanvas with information about event
    eventBadge.addEventListener("click", fillOffCanvasWithEventData);

    // Set offcanvas attributes
    eventBadge.setAttribute("data-bs-toggle", "offcanvas");
    eventBadge.setAttribute("data-bs-target", "#offcanvasRight");
    eventBadge.setAttribute("aria-controls", "offcanvasRight");
    eventBadge.setAttribute("data-storage-key", storageKey);

    // Add a small badge with event start time for tablet+ devices
    eventBadge.classList.add("btn", "btn-sm", "btn-primary", "my-1");
    eventBadge.innerHTML = `
            ${event.name}
            <span class="badge text-bg-light">
                ${eventTime}
            </span>`;
    eventsContainer.appendChild(eventBadge);

    // Increase events counter for the mobile devices view
    let eventsCounter = calendarDay.querySelector("[type=button]");
    let counter = eventsCounter.querySelector("p");

    counter.innerText = parseInt(eventsCounter.innerText) + 1;
    eventsCounter.classList.remove("empty");

    // Set event listener to fill up a modal with events
    eventsCounter.addEventListener("click", fillModalWithEvents);
  });
}

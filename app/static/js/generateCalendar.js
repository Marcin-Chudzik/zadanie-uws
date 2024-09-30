document.addEventListener("DOMContentLoaded", function () {
  const calendarContainer = document.getElementById("calendarDays");
  const monthYearElement = document.getElementById("currentMonth");
  const prevButton = document.getElementById("prevMonth");
  const nextButton = document.getElementById("nextMonth");
  let currentDate = new Date();

  // Function to generate calendar with day cards for selected month
  function generateCalendar(date) {
    calendarContainer.innerHTML = ""; // Flushing content of the calendar

    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // Day of the week starting a new month
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Amount of days in month
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Setting new month name and year in calendar header
    monthYearElement.textContent = `${monthNames[month]} ${year}`;
    // Counting an amount of empty days before first day of month
    let emptyDays = (firstDayOfMonth + 6) % 7;

    // Creating empty days
    for (let i = 0; i < emptyDays; i++) {
      let emptyCell = document.createElement("div");

      emptyCell.classList.add("col-1-7");
      calendarContainer.appendChild(emptyCell);
    }

    // Generating the month days
    for (let day = 1; day <= daysInMonth; day++) {
      let dayCell = document.createElement("div");

      dayCell.classList.add("col-1-7");
      dayCell.innerHTML = `
            <div id="day-${day}" class="calendar-card">
                <h3>${day}</h3>

                <div class="container calendar-card-events"></div>

                <button type="button" class="btn btn-primary position-relative calendar-card-events-counter empty" data-bs-toggle="modal" data-bs-target="#eventsModal" data-day="day-${day}">
                    <p class="events-counter">0</p>
                    <span class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                        <span class="visually-hidden">New alerts</span>
                    </span>
                </button>
            </div>
            `;
      calendarContainer.appendChild(dayCell);
    }

    // Fetching data about events for selected month from API
    fetchAllEvents(currentDate.getMonth());
  }

  // Previous month btn
  prevButton.addEventListener("click", function (e) {
    e.preventDefault();
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendar(currentDate);
  });

  // Next month btn
  nextButton.addEventListener("click", function (e) {
    e.preventDefault();
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar(currentDate);
  });

  // Generating calendar for the current selected month
  generateCalendar(currentDate);
});

// Show loading screen
function showLoading() {
  document.getElementById("loading-screen").style.visibility = "visible";
}

// Hide loading screen
function hideLoading() {
  document.getElementById("loading-screen").style.visibility = "hidden";
}

// Fetch detailed data about current month events from backend
async function fetchAllEvents(month) {
  try {
    showLoading();

    // Doing request to backend and in return get detailed data about events from API as JSON
    const response = await fetch(
      `${window.location.origin}/events/fetch-events/${month}/`,
      { method: "GET" }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const events = await response.json();

    // Passing a JSON object of events data to function which load it to calendar
    loadEventsToCalendar(events.events);
  } catch (error) {
    console.error("An error occurred while downloading data:", error);
  } finally {
    hideLoading();
  }
}

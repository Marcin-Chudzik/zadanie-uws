function fillOffCanvasWithEventData(event) {
  // Getting data about event from session storage and parsing it from string to JSON
  let data = JSON.parse(
    sessionStorage.getItem(event.delegateTarget.dataset.storageKey)
  );
  let offCanvas = document.getElementById("offcanvasRight");

  // Filling up offcanvas elements with an event data
  offCanvas.querySelector(".offcanvas-title").innerText = data.name;
  offCanvas.querySelector(".img-fluid").src = data.image_url;
  offCanvas.querySelector("small").innerText = data.short_description;
  offCanvas.querySelector("p").innerText = data.long_description;

  // Clearing offcanvas from the previous event data and adding the new one
  let offCanvasInfo = offCanvas.querySelector("ul");
  offCanvasInfo.innerHTML = "";

  const itemsData = [
    `On day: ${data.date}`,
    `Start at: ${data.start_time}`,
    `Duration: ${data.duration}h`,
    `Location: ${data.location}`,
    `Registration on event: <a href="${data.registration_link}">Register</a>`,
  ];

  itemsData.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.innerHTML = item;
    offCanvasInfo.appendChild(listItem);
  });

  // Clearing offcanvas from the previous event tags and adding the new one
  let offCanvasTags = offCanvas.querySelector(".container .align-items-start");
  offCanvasTags.innerHTML = "";

  data.tags.forEach((tag) => {
    let tagBadge = document.createElement("span");

    tagBadge.classList.add("badge", "text-bg-violet", "mx-1");
    tagBadge.innerText = tag.name.charAt(0).toUpperCase() + tag.name.slice(1);
    offCanvasTags.appendChild(tagBadge);
  });
}

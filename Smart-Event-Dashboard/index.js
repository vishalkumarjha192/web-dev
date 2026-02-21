const eventList = document.getElementById("eventList");
const keyOutput = document.getElementById("keyOutput");

function addEvent() {
  const title = document.getElementById("title").value;
  const date = document.getElementById("date").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("discription").value;

  

  if (title === "" || date === "") {
    alert("Please enter title and date");
    return;
  }

 


  const emptyMsg = document.getElementById("empty");
  if (emptyMsg) {
    emptyMsg.remove();
  }

  const div = document.createElement("div");
  div.className = "event";

  div.innerHTML = `
    <h4>${title}</h4>
    <p><strong>Date:</strong> ${date}</p>
    <p><strong>Category:</strong> ${category}</p>
    <p>${description}</p>
    <hr>
  `;

  eventList.appendChild(div);

 


  document.getElementById("title").value = "";
  document.getElementById("date").value = "";
  document.getElementById("discription").value = "";
}

function clearEvents() {
  eventList.innerHTML =
    '<p id="empty">No event yet. Add your first event!</p>';
}

function addSampleEvents() {
  clearEvents();

  const samples = [
    { title: "AI Conference", date: "2026-03-10", category: "Conference" },
    { title: "Web Workshop", date: "2026-03-15", category: "Workshop" }
  ];



  const emptyMsg = document.getElementById("empty");
  if (emptyMsg) {
    emptyMsg.remove();
  }

  samples.forEach(e => {
    const div = document.createElement("div");
    div.className = "event";

    div.innerHTML = `
      <h4>${e.title}</h4>
      <p><strong>Date:</strong> ${e.date}</p>
      <p><strong>Category:</strong> ${e.category}</p>
      <hr>
    `;

    eventList.appendChild(div);
  });
}

/* DOM Demo */
document.addEventListener("keydown", function (event) {
  keyOutput.innerHTML = `<strong>You Pressed:</strong> ${event.key}`;
});
const container = document.getElementById("card-past");
const currentDate = data.currentDate;
const dataEvents = data.events;
const inputSearch = document.getElementById("js-search");
const button = document.getElementById("button-submit");
const checkbox = document.getElementById("check");
const pastEvents = dateFilter(dataEvents, currentDate);


let checkItem = [];
let applied = {};


updateCard(pastEvents, container);

function filterBoth(fn, value) {
  let event = pastEvents;
  applied[fn] = value;

  for (let name in applied) {
    if (name === "isCheck") {
      event = event.filter((echeck) => applied[name].includes(echeck.category));
    }
    if (name === "matchesWithText") {
      event = event.filter((etext) =>
        etext.name.toLowerCase().includes(applied[name].toLowerCase())
      );
    }
  }
  return event;
}

checkbox.addEventListener("click", function (event) {
  let checked = event.target.checked;
  let value = event.target.value;
  if (checked) {
    checkItem.push(value);
  } else {
    checkItem = checkItem.filter((item) => item != value);
  }
  filter(checkItem);
});

inputSearch.addEventListener("input", function (ev) {
  let event;
  event = filterBoth("matchesWithText", ev.target.value);
  if (ev.target.value === "") {
    applied = {};
    updateCard(pastEvents, container);
  }
  checkButton(event, container);
});

function checkButton(event, container) {
  button.addEventListener("click", function () {
    updateCard(event, container);
  });
}

function filter(item) {
  let event;
  event = filterBoth("isCheck", item);
  updateCard(event, container);
  if (item.length === 0) {
    applied = {};
    updateCard(pastEvents, container);
  }
}

function updateCard(events, element) {
  element.innerHTML = ""; // limpiar antes de volver a imprimir
  for (let card of events) {
    makeCards(card, container);
  }
}

function dateFilter(data, current) {
  let pastEvents = [];
  let dateCmp;
  let date;
  let currentDateCmp;
  for (let i = 0; i < data.length; i++) {
    date = data[i].date;
    dateCmp = new Date(date);
    currentDateCmp = new Date(current);
    if (dateCmp < currentDateCmp) {
      pastEvents.push(data[i]);
    }
  }
  return pastEvents;
}

function makeCards(data, contenedor) {
  contenedor.innerHTML += `
<div class="card-size  card text-bg-secondary bg-opacity-50" style="width: 18rem;">
      <img src="${data.image}" class="card-img-top" alt="${data.name}">
      <div class="card-body ">
        <h5 class="card-title text-center">${data.name}</h5>
        <p class="card-text ">${data.description}
        </p>
      </div>

      <div class="card-body">
        <p>Price :$${data.price}</p>
        <a href="details_cocina.html" class="card-link text-white">Details</a>
      </div>
    </div>
  `;
}


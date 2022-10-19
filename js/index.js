const container = document.getElementById("card");
const events = data.events;
const inputSearch = document.getElementById("js-search");
const button = document.getElementById("button-submit");
const checkbox = document.getElementById("check");
let checkItem = [];
let applied = {};

updateCard(events, container);

createCheckbox(events,checkbox);

function createCheckbox(event,container) {
// let checkBoxData= [];
// for (let card of event) {
//     checkBoxData.push(card.category);
//   }
// checkBoxDataUni= [... new Set(checkBoxData)];
// console.log(checkBoxDataUni);
//   for(let check of checkBoxDataUni) {
//     makeCategory(check,container)
//     console.log(check);
  let checkBoxData = new Set(event.map(element => element.category));
  checkBoxData= [...checkBoxData];
     for(let check of checkBoxData) {
    makeCategory(check,container)
     }
}
// }


checkbox.addEventListener("click", function (event) {
  let checked = event.target.checked;
  let value = event.target.value;
  console.log(value);
  if (checked) {
    checkItem.push(value);
  } else {
    checkItem = checkItem.filter((item) => item != value);
  }
  filter(checkItem);
});


function filterBoth(fn, value) {
  let event = events;
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

function filter(item) {
  let event;
  event = filterBoth("isCheck", item);
  updateCard(event, container);
  if (item.length === 0) {

    updateCard(events, container);
  }
}

function updateCard(events, element) {
  element.innerHTML = "";
  for (let card of events) {
    makeCards(card, container);
  }
}



inputSearch.addEventListener("keyup", function (ev) {
  let event;
  event = filterBoth("matchesWithText", ev.target.value);
  if(ev.target.value === "") {
    updateCard(events, container);
  }
  updateCard(event, container);

});






function makeCategory(data,containerCategory) {
 
  // console.log(containerCategory)
  containerCategory.innerHTML += `
         <div class="form-check form-check-inline ">
          <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="${data}">
          <label class="form-check-label" for="inlineCheckbox1">${data}</label>
        </div>
  
  `;
}




function makeCards(data, contenedor) {
  contenedor.innerHTML += `
 <div  class="card-size  card text-bg-secondary bg-opacity-50" style="width: 18rem;">
      <img src="${data.image}" class="card-img-top" alt="${data.name}">
      <div class="card-body ">
        <h5 class="card-title text-center">${data.name}</h5>
        <p class="card-text ">${data.description}
        </p>
      </div>

      <div class="card-body">
        <p>Price :$${data.price}</p>
        <a href="details.html?id=${data._id}" class="card-link text-white">Details</a>
      </div>
    </div>
  `;
}

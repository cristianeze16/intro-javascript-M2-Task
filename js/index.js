const container = document.getElementById("card");
const events = data.events;
let checkbox = document.getElementById("check");
let checkItem = [];
printCardCategory(events);


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

function filter(item) {
  let event = events;
  
 
    event= event.filter((e) => item.includes(e.category));
    container.innerHTML=''; // limpiar antes de volver a imprimir
    printCardCategory(event);
    console.log(event);
}

function printCardCategory(events) {
  for (let card of events) {
    makeCards(card, container);
  }
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
        <a href="details_cocina.html" class="card-link text-white">Details</a>
      </div>
    </div>
  `;
}

const container = document.getElementById("card");
const events = data.events;

for (let card of events) {
  makeCards(card, container);
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


// let container = document.getElementById("card");
// for (let i = 0; i < data.events.length; i++) {
//   let div = document.createElement("div");

//   div.innerHTML = `

//  <div class="card-size  card text-bg-secondary bg-opacity-50" style="width: 18rem;">
//       <img src="${data.events[i].image}" class="card-img-top" alt="${data.events[i].name}">
//       <div class="card-body ">

//         <h5 class="card-title text-center">${data.events[i].name}</h5>
//         <p class="card-text ">${data.events[i].description}
//         </p>
//       </div>

//       <div class="card-body">
//         <p>Price :$${data.events[i].price}</p>
//         <a href="details_cocina.html" class="card-link text-white">Details</a>
//       </div>
//     </div>

//   `;
//   container.appendChild(div);
// }

let id= location.search.slice(4);

console.log(id);
 let containerCard = document.getElementById("cardDiv");

 let idFiltrada=data.events.find(data => data._id== id)

makeCards(idFiltrada, containerCard);

 function makeCards(data, contenedor) {
  

  let assist ="";
  if (data.assistance) {
    assist = `<li>Assistance: ${data.assistance}</li>`
  }else{
    assist = `<li>Estimate: ${data.estimate}</li>`

  }

  
  contenedor.innerHTML += `
 
      <div class="card mb-3 text-bg-secondary bg-opacity-50">
        <img class="img-card-detail    card-img-top" src="${data.image}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title text-center">${data.name}</h5>
          <p class="card-text">${data.description}
          </p>
          <ul>
            <li>Price: ${data.price}</li>
            <li>Category: ${data.category}</li>
            <li>Capacity: ${data.capacity}</li>
            ${assist}
            <li>Date: ${data.date}</li>
            </ul>
         
        </div>
      </div>

    
  `;
 }

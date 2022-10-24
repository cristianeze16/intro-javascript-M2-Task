async function getDetails() {
  try {
    let id = location.search.slice(4);
    response = await fetch(`https://mind-hub.up.railway.app/amazing/${id}`);
    data = await response.json();

    let containerCard = document.getElementById("cardDiv");
    console.log(data.event);

    makeCards(data.event, containerCard);

    function makeCards(data, contenedor) {
      let assist = "";
      if (data.assistance) {
        assist = `<li>Assistance: ${data.assistance}</li>`;
      } else {
        assist = `<li>Estimate: ${data.estimate}</li>`;
      }
      dataSlice = data.date.slice(0, 10);

      contenedor.innerHTML += `
 
      <div class="card mb-3 text-bg-secondary bg-opacity-50">
        <img class="img-card-detail    card-img-top" src="${data.image}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title text-center">${data.name}</h5>
          <p class="card-text text-center">
          ${data.description}
          </p>
          <ul>
            <li>Price: ${data.price}</li>
            <li>Category: ${data.category}</li>
            <li>Capacity: ${data.capacity}</li>
            ${assist}
            <li>Date: ${dataSlice}</li>
            </ul>
        </div>
      </div>
    
  `;
    }
  } catch (error) {}
}

getDetails();

async function getData() {
  try {
    let response = await fetch("https://mh-amazing.herokuapp.com/amazing");
    let data = await response.json();
    let events = data.events;
    let checkItem = [];
    const checkbox = document.getElementById("check");
    const inputSearch = document.getElementById("js-search");
    const container = document.getElementById("card");

    function createCheckbox(event, container) {
      let checkBoxData = new Set(event.map((element) => element.category));
      checkBoxData = [...checkBoxData];
      for (let check of checkBoxData) {
        makeCategory(check, container);
      }
    }




    updateCard(events, container);
    createCheckbox(events, checkbox);

    checkbox.addEventListener("change", filterSearch);
    inputSearch.addEventListener("keyup", filterSearch);

    function filterSearch() {
      let checked = [...document.querySelectorAll('input[type="checkbox"]:checked')].map(element =>element.value);
     let filterchecked= events.filter(check=>checked.includes(check.category)||checked.length === 0)
     let filterText = filterchecked.filter(text =>text.name.toLowerCase().includes(inputSearch.value.toLowerCase()))
     updateCard(filterText,container)
     
   
    }
  
    function updateCard(events, element) {
      element.innerHTML = "";
      if(events.length > 0) {
      for (let card of events) {
        makeCards(card, container);
      }
    }else{
    
    element.innerHTML = `<h1 class="text-white text-bg-secondary bg-opacity-50 "> Oops not found try search again </h1>`;
    }
    }


    function makeCategory(data, containerCategory) {
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
        <a href="details.html?id=${data.id}" class="card-link text-white">Details</a>
      </div>
    </div>
  `;

    }
  } catch (error) {
    console.log(error);
  }
}

getData();

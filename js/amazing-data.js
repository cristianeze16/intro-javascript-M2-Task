async function getData(){

  try{
      let response = await fetch("https://mind-hub.up.railway.app/amazing")
      let data = await response.json();
      let events = data.events;
      console.log("🚀 ~ file: amazing-data.js ~ line 7 ~ getData ~ events", events);
     const checkbox = document.getElementById("check");
     const inputSearch = document.getElementById("js-search");
     const button = document.getElementById("button-submit");
    //  let checkItem = [];
    //  let applied = {};
const container = document.getElementById("card");

      updateCard(events, container);
      createCheckbox(events, checkbox);

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



      function filterBoth(fn, value) {
        let event = events;
        applied[fn] = value;
        console.log(applied);
        for (let name in applied) {
          if (name === "isCheck") {
            event = event.filter((echeck) =>
              applied[name].includes(echeck.category)
            );
          }
          if (name === "matchesWithText") {
            event = event.filter((etext) =>
              etext.name.toLowerCase().includes(applied[name].toLowerCase())
            );
          }
        }
        if (event.length === 0) {
          applied = {};
        }
        return event;
      }

      function filter(item) {
        let event;
        event = filterBoth("isCheck", item);
        updateCard(event, container);
        if (item.length === 0) {
          event = events;
          updateCard(event, container);
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
        if (ev.target.value === "") {
          // updateCard(events, container);
        }
        updateCard(event, container);
      });




  }catch(error){
  }
}

getData();
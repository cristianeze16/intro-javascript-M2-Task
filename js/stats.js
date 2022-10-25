async function getPastStatsTable1() {
  try {
    response = await fetch(
      "https://mh-amazing.herokuapp.com/amazing?time=past"
    );
    data = await response.json();
    events = data.events;
    let table1 = document.getElementById("table-1");
    let table3 = document.getElementById("table-3");

    events.map((pastEvents) => {
      pastEvents.assistancePerCenth = (
        (100 * pastEvents.assistance) /
        pastEvents.capacity
      ).toFixed(2);
      pastEvents.gain = pastEvents.price * pastEvents.assistance;
    });

    let ordenPorAsist = [...events].sort(
      (event1, event2) => event1.assistancePerCenth - event2.assistancePerCenth
    );
    let menorAsistencia = ordenPorAsist[0];
    let mayorAsistencia = ordenPorAsist[ordenPorAsist.length - 1];
    let ordenPorCapacidad = [...events].sort(
      (event1, event2) => event1.capacity - event2.capacity
    );
    let mayorCapacidad = ordenPorCapacidad[ordenPorCapacidad.length - 1];

    printTable1(table1, menorAsistencia, mayorAsistencia, mayorCapacidad);

    let categories = new Set(events.map((element) => element.category));
    categories = [...categories];

    let filtercategories = categories.map((categoria) => {
      let filterReduce = events.filter((event) => event.category == categoria);
      return reduce(filterReduce);
    });

    for (let array of filtercategories) {
      printTable3(array, table3);
    }

    function reduce(filter) {
      let initial = {
        category: "",
        gain: 0,
        assistance: 0,
        capacity: 0,
      };
      let result = filter.reduce((variableAccumulador, element2) => {
        return {
          category: element2.category,
          gain: variableAccumulador.gain + element2.gain,
          assistance: variableAccumulador.assistance + element2.assistance,
          capacity: variableAccumulador.capacity + element2.capacity,
        };
      }, initial);
      result.percenth = ((100 * result.assistance) / result.capacity).toFixed(
        2
      );
      return result;
    }
  } catch (error) {}
}

function printTable3(dataTable, container) {
  container.innerHTML += `
  <td>${dataTable.category}</td>
  <td>$${dataTable.gain}</td>
  <td>${dataTable.percenth} %</td> 
   `;
}

getPastStatsTable1();

function printTable1(container, minAsistencia, maxAsistencia, maxCapacidad) {
  container.innerHTML = `<tr>
            <td>Events with the min percentage of attendance</td>
            <td>Events with the hightest percentage of attendance</td>
            <td>Events with larger</td>
          </tr>
          <tr>
            <td>${minAsistencia.name}</td>
            <td>${maxAsistencia.name}</td>
            <td>${maxCapacidad.name}</td>
          </tr>
          <tr>
            <td>${minAsistencia.assistancePerCenth} %</td>
            <td>${maxAsistencia.assistancePerCenth} %</td>
            <td>${maxCapacidad.capacity}</td>
          </tr>
  `;
}

async function getUpStatsTable2() {
  try {
    response = await fetch(
      "https://mh-amazing.herokuapp.com/amazing?time=upcoming"
    );
    data = await response.json();
    events = data.events;
    events.map((up) => {
      up.gain = up.price * up.estimate;
      up.estimates = ((100 * up.estimate) / up.capacity).toFixed(2);
    });

    let table2 = document.getElementById("table-2");
    let categories = new Set(events.map((element) => element.category));
    categories = [...categories];

    let filtercategories = categories.map((categoria) => {
      let filterReduce = events.filter((event) => event.category == categoria);
      return reduce(filterReduce);
    });
    for (let array of filtercategories) {
      printTable2(array, table2);
    }

    function reduce(filter) {
      let initial = {
        category: "",
        gain: 0,
        estimates: 0,
      };
      let result = filter.reduce((variableAccumulador, element2) => {
        return {
          category: element2.category,
          gain: variableAccumulador.gain + element2.gain,
          estimates: element2.estimates,
        };
      }, initial);

      return result;
    }
  } catch (error) {}
}
getUpStatsTable2();

function printTable2(dataTable, container) {
  container.innerHTML += `
  <td>${dataTable.category}</td>
  <td>$${dataTable.gain}</td>
  <td>${dataTable.estimates} %</td>
   `;
}

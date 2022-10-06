let currentDate = data.currentDate;
let date = data.events[0].date;
// const future = dateFilter(data, currentDate);
const futureEvents= dateFilter(data, currentDate);


for(let future of futureEvents){
  makeCards(future,container);
}














function dateFilter(data, current) {
  // futureEvent = false;
  let upcomming=[];
  for (let i = 0; i < data.events.length; i++) {
    let date = data.events[i].date;
    let dateCmp = new Date(date);
    let currentDateCmp = new Date(current);
    if (dateCmp > currentDateCmp) {
    // futureEvent = true;
      // console.log("FUTURE EVENT");
      // console.log(currentDateCmp + "ACtualidad");
      // console.log(dateCmp);
    upcomming.push(data[i]);


    
    }
    
    // return futureEvent;
    console.log(upcomming)
  }
}


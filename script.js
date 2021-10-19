function addDocButtonPressed() {
  console.log({ firebase, db });
  //   const uid = loggedInUser ? loggedInUser.uid : null;
  db.collection("users")
    .add({
      first: "Ada",
      last: "Lovelace",
      favouriteNumber: Math.round(Math.random() * 10),
      //   authorId: uid,
      born: 1815,
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}

function addChart() {
  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];
  const data = {
    labels: labels,
    datasets: [{
      label: 'My First dataset',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45],
    }]
  };
  const config = {
    type: 'line',
    data: data,
    options: {}
  };
  var myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
}

function readDocsButtonPressed() {
  db.collection("CO2Readings")
    .get()
    .then((querySnapshot) => {
      let values = querySnapshotToArray(querySnapshot)
      console.log(values)
      const xValues = getReadings("CO2", values)
      console.log(xValues)
      const yValues = getReadings("numPeople", values)
      console.log(yValues)
    });
}

function getReadings(key, data) {
  let values = []
  data.forEach((object) => {
    values.push(object[key])
  });
  return values
}

function querySnapshotToArray(qs) {
  let values = []
  qs.forEach((doc) => {
    // ... = spread operator - expand doc.data properties into a new object that is alongside id
    values.push({ id: doc.id, ...doc.data() })
  });
  return values
}

function addAQReadingInformation() {
  let numPeopleElem = document.getElementById("peopleNum")
  let co2ReadingElem = document.getElementById("CO2")
  let sensorPosElem = document.getElementById("sensorPos")
  console.log({ firebase, db });
  //   const uid = loggedInUser ? loggedInUser.uid : null;
  db.collection("CO2Readings")
    .add({
      CO2: parseInt(co2ReadingElem.value),
      numPeople: parseInt(numPeopleElem.value),
      sensorPos: parseInt(sensorPosElem.value),
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}

function submitData() {
  addAQReadingInformation()
  let numPeopleElem = document.getElementById("peopleNum")
  let co2ReadingElem = document.getElementById("CO2")
  let sensorPosElem = document.getElementById("sensorPos")
  console.log(numPeopleElem.value)
  console.log(co2ReadingElem.value)
  console.log(sensorPosElem.value)
  numPeopleElem.value = null
  co2ReadingElem.value = null
  sensorPosElem.value = null
}

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

function readDocsButtonPressed() {
  db.collection("CO2Readings")
    .get()
    .then((querySnapshot) => {
      let values = querySnapshotToArray(querySnapshot)
      console.log(values)
      // const xValues = getReadings("CO2", values)
      // console.log(xValues)
      // const yValues = getReadings("numPeople", values)
      // console.log(yValues)
      datasetlist = []
      for (let i = 1; i < 5; i++) {
        dataset = sepDataBySensorPos(values, i)
        dataset = scatterGraphDataFormatting(dataset)
        datasetlist.push(dataset)
      }
      console.log(datasetlist)
      if (myChart) {
        myChart.data.datasets[0].data = datasetlist[0]
        myChart.data.datasets[1].data = datasetlist[1]
        myChart.data.datasets[2].data = datasetlist[2]
        myChart.data.datasets[3].data = datasetlist[3]
        myChart.update();
      } else {
        addScatterChart(datasetlist)
      }
    });
}

function sepDataBySensorPos(values, sensorN) {
  data = []
  values.forEach((object) => {
    if (object["sensorPos"] == sensorN) {
      data.push(object)
    }
  });
  return data
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

function generateData(n, sn) {
  for (let i = 0; i < n; i++) {
    let co2 = Math.floor(Math.random() * (3000 - 300) + 300)
    let numPeople = Math.floor(Math.random() * (30))
    let sensorPos = sn
    db.collection("CO2Readings")
      .add({
        CO2: parseInt(co2),
        numPeople: parseInt(numPeople),
        sensorPos: parseInt(sensorPos),
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }
}
let numPeopleElems = [document.getElementById("peopleNum1"), document.getElementById("peopleNum2"), document.getElementById("peopleNum3"), document.getElementById("peopleNum4")]
let co2ReadingElems = [document.getElementById("CO21"), document.getElementById("CO22"), document.getElementById("CO23"), document.getElementById("CO24")]
numPeopleElems.forEach((element) => {
  element.value = 0
})

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
  db.collection("CO2LocalTest")
    .orderBy("timestamp", "asc")
    .get()
    .then((querySnapshot) => {
      values = querySnapshotToArray(querySnapshot)
      console.log(values)
      // const xValues = getReadings("CO2", values)
      // console.log(xValues)
      // const yValues = getReadings("numPeople", values)
      // console.log(yValues)
      datasetlist = []
      let graphType = document.getElementById("graphSelect").value
      for (let i = 1; i < 5; i++) {
        dataset = sepDataBySensorPos(values, i)
        if (graphType == "bubble") {
          dataset = bubbleGraphDataF(dataset)
        } else if (graphType == "CO2Line") {
          dataset = LineChartDataF(dataset, "CO2")
        } else if (graphType == "numPeopleLine") {
          dataset = LineChartDataF(dataset, "numPeople")
        }
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
        if (graphType == "bubble") {
          addBubbleChart(datasetlist)
        } else if (graphType == "CO2Line") {
          addTimeLineChart(datasetlist)
        } else if (graphType == "numPeopleLine") {
          addTimeLineChart(datasetlist)
        }
      }
    });
}

function changeGraphType() {
  myChart.destroy();
  let graphType = document.getElementById("graphSelect").value
  for (let i = 1; i < 5; i++) {
    dataset = sepDataBySensorPos(values, i)
    if (graphType == "bubble") {
      dataset = bubbleGraphDataF(dataset)
    } else if (graphType == "CO2Line") {
      dataset = LineChartDataF(dataset, "CO2")
    } else if (graphType == "numPeopleLine") {
      dataset = LineChartDataF(dataset, "numPeople")
    }
    datasetlist.push(dataset)
  }
  if (graphType == "bubble") {
    addBubbleChart(datasetlist)
  } else if (graphType == "CO2Line") {
    addTimeLineChart(datasetlist)
  } else if (graphType == "numPeopleLine") {
    addTimeLineChart(datasetlist)
  }
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
  let numPeopleElems = [document.getElementById("peopleNum1"), document.getElementById("peopleNum2"), document.getElementById("peopleNum3"), document.getElementById("peopleNum4")]
  let co2ReadingElems = [document.getElementById("CO21"), document.getElementById("CO22"), document.getElementById("CO23"), document.getElementById("CO24")]
  console.log({ firebase, db });
  //   const uid = loggedInUser ? loggedInUser.uid : null;
  for (let i = 0; i < 4; i++) {
    if (co2ReadingElems[i].value == 0) {
      document.getElementById("errorMessage").textContent = "please fill in fully"
      return
    } else {
      document.getElementById("errorMessage").textContent = ""
    }
  }
  for (let i = 0; i < 4; i++) {
    db.collection("CO2LocalTest")
      .add({
        CO2: parseInt(co2ReadingElems[i].value),
        numPeople: parseInt(numPeopleElems[i].value),
        sensorPos: parseInt(i + 1),
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

function submitData() {
  addAQReadingInformation()
  let numPeopleElems = [document.getElementById("peopleNum1"), document.getElementById("peopleNum2"), document.getElementById("peopleNum3"), document.getElementById("peopleNum4")]
  let co2ReadingElems = [document.getElementById("CO21"), document.getElementById("CO22"), document.getElementById("CO23"), document.getElementById("CO24")]
  numPeopleElems.forEach((element) => {
    element.value = 0
  })
  co2ReadingElems.forEach((element) => {
    element.value = null
  })
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
        timestamp: firebase.firestore.Timestamp.fromMillis(generateRandomTimestamp()),
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }
}

function generateRandomTimestamp() {
  //Epochs millisecond values for 25 Oct and 14 Oct - https://www.epochconverter.com/
  let max = 1635189137000
  let min = 1634195445000
  return Math.random() * (max - min) + min
}
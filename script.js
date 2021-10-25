// intentionally global variable - modified over the life of the web app
let myChart;

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

function addScatterChart(datasetlist) {
  const data = {
    datasets: [{
      label: 'Sensor1',
      data: datasetlist[1],
      backgroundColor: 'rgb(255, 99, 132)'
    },
    {
      label: 'Sensor2',
      data: datasetlist[2],
      backgroundColor: 'rgb(255, 255, 132)'
    },
    {
      label: 'Sensor3',
      data: datasetlist[3],
      backgroundColor: 'rgb(255, 0, 255)'
    },
    ]
  };
  const config = {
    type: 'scatter',
    data: data,
    options: {
      scales: {
        x: {
          type: 'linear',
          position: 'bottom'
        }
      }
    }
  };
  myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
}


function addExampleScatterChart() {
  const data = {
    datasets: [{
      label: 'Scatter Dataset',
      data: [{
        x: -10,
        y: 0
      }, {
        x: 0,
        y: 10
      }, {
        x: 10,
        y: 5
      }, {
        x: 0.5,
        y: 5.5
      }],
      backgroundColor: 'rgb(255, 99, 132)'
    }],
  };
  const config = {
    type: 'scatter',
    data: data,
    options: {
      scales: {
        x: {
          type: 'linear',
          position: 'bottom'
        }
      }
    }
  };
  var myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
}

function addExampleChart() {
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
      // const xValues = getReadings("CO2", values)
      // console.log(xValues)
      // const yValues = getReadings("numPeople", values)
      // console.log(yValues)
      datasetlist = []
      for (let i = 0; i <= 3; i++) {
        dataset = sepDataBySensorPos(values, i)
        dataset = scatterGraphDataFormatting(dataset)
        datasetlist.push(dataset)
      }
      console.log(datasetlist)
      // let dataset1 = sepDataBySensorPos(values, 1)
      // let dataset2 = sepDataBySensorPos(values, 2)
      // let scatterDataset1 = scatterGraphDataFormatting(dataset1)
      // let scatterDataset2 = scatterGraphDataFormatting(dataset2)
      // console.log(scatterDataset1)
      // console.log(scatterDataset2)
      if (myChart) {
        myChart.data.datasets[0].data = scatterDatasets
        myChart.update();
      } else {
        addScatterChart(datasetlist)
      }
    });
}

function scatterGraphDataFormatting(values) {
  return values.map((object) => { return { x: object["CO2"], y: object["numPeople"] } })
  // OR return values.map((object) => ({ x: object["CO2"], y: object["numPeople"] }))
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
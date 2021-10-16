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
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data(), null, 2)}`);
      });
    });
}

function addAQReadingInformation(){
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

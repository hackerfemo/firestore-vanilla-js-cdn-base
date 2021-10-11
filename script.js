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
  db.collection("users")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data(), null, 2)}`);
      });
    });
}

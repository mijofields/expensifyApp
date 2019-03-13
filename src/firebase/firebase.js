import * as firebase from 'firebase';

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };


//   database.ref('expenses').on('child_removed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
//   });

//   database.ref('expenses').on('child_changed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
//   });

//   database.ref('expenses').on('child_added', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
//   });





  // const expenses = [{
  //     description: 'cheese',
  //     note: '',
  //     amount: 63.73,
  //     createdAt: 0
  // }, {
  //     description: 'soap',
  //     note: '',
  //     amount: 4.95,
  //     createdAt: 100
  // }, {
  //     description: 'big ass titties',
  //     note: '',
  //     amount: 140.00,
  //     createdAt: 200
  // }];

  // expenses.map((expense) => database.ref('expenses').push(expense));

//  database.ref('expenses')
//  .once('value')
//  .then((snapshot) => {
//    const expenses = [];
//    snapshot.forEach((childSnapshot)=>{
//      expenses.push({
//        id: childSnapshot.key,
//        ...childSnapshot.val()
//      });
//    });

//    console.log(expenses);

//   });

//   database.ref('expenses')
//  .on('value', (snapshot) => {
//   const expenses = [];
//   snapshot.forEach((childSnapshot)=>{
//     expenses.push({
//       id: childSnapshot.key,
//       ...childSnapshot.val()
//     });
//   });

//   console.log(expenses);

//  }); 



//   database.ref('expenses').on('value', (snapshot)=> {
//   console.log(snapshot.val());
// });

  // database.ref('notes').push({
  //   languauge: 'spanish',
  //   body: 'si'
  // });

// database.ref().set({
//       username: 'Mike Fields',
//       email: 'mikefields81@gmail.com',
//       age : 37
//     })
//     .then(() => {
//       console.log(`data is saved`);
//     })
//     .catch((e) => {
//       console.log(`this failed`, e);
//     });

// database.ref('/age').set(147);

// database.ref('location').set({
//     city: 'London',
//     country: 'UK'
// })
// .then(() => {
//   console.log(`data is saved!`);
// })
// .catch((e) => {
//   console.log(`this failed`, e);
// });

// database.ref('fav insult').set('your mum');
  
// database.ref('fav insult').remove()
// .then(() => {
//   console.log(`data was removed!`);
// })
// .catch((e) => {
//   console.log(`removal failed`, e);
// });


// database.ref().update({
//   name: "Ledley King",
//   age: 2,
//   'location/city': "dallas"
// })
// .then(() => {
//   console.log(`data was updated!`);
// })
// .catch((e) => {
//   console.log(`update failed`, e);
// });

// database.ref().once('value')
// .then((snapshot)=> {
//   console.log(snapshot.val());
// }).
// catch((e)=> {
//   console.log(`error: `, e)
// });

// //reprints the object upon changes to db - subscription
// database.ref().on('value', (snapshot)=> {
//   console.log(snapshot.val());
// });



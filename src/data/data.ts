import { initializeApp } from "firebase/app";
import { getFirestore, query } from "firebase/firestore";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: `${process.env.API_KEY}`,
  authDomain: "unqueue-548b5.firebaseapp.com",
  databaseURL: "https://unqueue-548b5-default-rtdb.firebaseio.com",
  projectId: "unqueue-548b5",
  storageBucket: "unqueue-548b5.appspot.com",
  messagingSenderId: "673597937174",
  appId: "1:673597937174:web:75c4d771d61a5ceefa4737",
  measurementId: "G-8QC6X19KM6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// auth
const fireApp = initializeApp(firebaseConfig);
const auth = getAuth(fireApp);

export async function fetchData(setDataFromAPI: Function) {
  console.log("data fetched ");
  let arrayOfObjects: object[] = [];
  const querySnapshot = await getDocs(collection(db, "data"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    arrayOfObjects.push(doc.data());
    // console.log(doc.data());
  });
  //   console.log(arrayOfObjects);
  setDataFromAPI(arrayOfObjects);
}

export async function sendLoggedInUserData(peopleInQueue: object[]) {
  // console.log("sendLoggedInUserData called");
  // // console.log(peopleInQueue);
  // onAuthStateChanged(auth, async (user) => {
  //   // console.log(user.uid);
  //   addDoc(collection(db, user.uid), {});
  //   // const data = doc(db, user.uid, `${peopleInQueue}`);
  //   // // Set the "capital" field of the city 'DC'
  //   // await updateDoc(data, {
  //   //   peopleInQueue: true,
  //   // });
  //   console.log("admin data successfully sent to db");
  // });
}

export const addUserToFirestore = () => {
  addDoc(collection(db, "admin"), {
    "Food Chains": {
      name: "mcd",
      location: "Delhi",
    },
    Hospital: {
      name: "aims",
      location: "Delhi",
    },
  });
  console.log("data added to db - admin ");
};

export async function checkQueueOfExistingUser(setPeopleInQueue) {
  onAuthStateChanged(auth, async (user) => {
    const querySnapshot = await getDocs(collection(db, user.uid));
    let queueData = [];
    querySnapshot.forEach((doc) => {
      queueData = doc.data().peopleInQueue;
    });
    setPeopleInQueue(queueData);
  });
}

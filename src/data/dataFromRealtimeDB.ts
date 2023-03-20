import { getDatabase, ref, child, get, set } from "firebase/database";

const dbRef = ref(getDatabase());

export function getDataFromRealtimeDB(setDataFromAPI) {
  console.log("getDataFromRealtimeDB called");

  get(child(dbRef, `users`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const arrayOfObjects = Object.values(snapshot.val());
        console.log(arrayOfObjects);
        setDataFromAPI(arrayOfObjects);
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

import { getDatabase, ref, onValue } from "firebase/database";
import { auth } from "./auth";
import { User } from "./sendDataAdmin";

export function getNameFromUID(domainName) {
  console.log("getNameFromUID called ");

  const db = getDatabase();
  const user: User = auth.currentUser;
  const starCountRef = ref(db, `admin/${domainName}`);
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
  });
}

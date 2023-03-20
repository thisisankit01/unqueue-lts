import { onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { auth } from "./auth";

export function writeAdminData(name: string, location: string, domain: string) {
  console.log("write called");
  const db = getDatabase();
  onAuthStateChanged(auth, (user) => {
    set(ref(db, `admin/${domain}/${user.uid}`), {
      name: name,
      location: location,
    });
    console.log("admin data sent ");
  });
}

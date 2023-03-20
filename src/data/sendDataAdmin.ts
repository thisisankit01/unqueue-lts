import { getDatabase, ref, set } from "firebase/database";

export function writeAdminData(name: string, location: string, domain: string) {
  console.log("write called");
  const db = getDatabase();
  set(ref(db, `admin/${domain}`), {
    name: name,
    location: location,
  });
}

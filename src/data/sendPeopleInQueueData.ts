import { getDatabase, ref, set } from "firebase/database";
import { auth } from "./auth";

export function writePeopleInQueueData(
  domainName: string,
  location: string,
  adminName,
  peopleInQueue
) {
  console.log("write called");
  const db = getDatabase();
  const user = auth.currentUser;

  set(ref(db, `queue/${domainName}/${location}/${adminName}/${user.uid}`), {
    peopleInQueue,
  });
  console.log("queue data sent ");
}

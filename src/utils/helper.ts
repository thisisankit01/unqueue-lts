export function handleChange(setFunction: Function) {
  const { name, value } = event.target as HTMLInputElement;
  setFunction((prev) => {
    return {
      ...prev,
      [name]: value,
    };
  });
}

export function findValidUser(
  data: object[],
  QID: object,
  setErrorMsg: Function
): object {
  let validUser = {};
  for (let i = 0; i < data.length; i++) {
    if (data[i].qid === QID.qidValue) {
      validUser = data[i];
      setErrorMsg("");
    }
  }
  return validUser;
}

export function addUserToQueue(
  setErrorMsg: Function,
  setPeopleInQueue: Function,
  validUser: object
) {
  if (!validUser.name) {
    setErrorMsg("Please enter a valid QID");
  } else {
    setPeopleInQueue((prev: object[]) => {
      return [...prev, validUser];
    });
  }
}

export function handleKeyDown() {
  if (event.keyCode === 13) {
    event.preventDefault();
  }
}

export const toggleShowAll = (showAll: boolean, setShowAll: Function) => {
  setShowAll(!showAll);
};

export function removeTopUserFromQueue(setPeopleInQueue) {
  setPeopleInQueue((prev: object[]) => {
    return [...prev.slice(1, prev.length)];
  });
}

export function isUserAlreadyInQueue(
  setErrorMsg: Function,
  validUser,
  peopleInQueue: object[]
): boolean {
  for (let i = 0; i < peopleInQueue.length; i++) {
    if (peopleInQueue[i].qid === validUser.qid) {
      setErrorMsg("User is already in the queue");
      return true;
    }
  }
  return false;
}

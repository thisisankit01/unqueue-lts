import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import AvgWaitingTime from "./AvgWaitingTime";
import PeopleInQueue from "./PeopleInQueue";
import { auth } from "../data/auth";
import { onAuthStateChanged } from "@firebase/auth";
import { fetchData } from "../data/data";

export default function Dashboard() {
  const navigate = useNavigate();
  const [dataFromAPI, setDataFromAPI] = useState<object[]>([]);
  const [peopleInQueue, setPeopleInQueue]: object[] = useOutletContext();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("user is logged in");
      if (user === null) {
        navigate("/");
      }
    });
  }, []);

  useEffect(() => {
    fetchData(setDataFromAPI);
  }, []);

  return (
    <div className="grid grid-cols-2 pt-10">
      <PeopleInQueue
        peopleInQueue={peopleInQueue}
        setPeopleInQueue={setPeopleInQueue}
      />
      <AvgWaitingTime
        dataFromAPI={dataFromAPI}
        setPeopleInQueue={setPeopleInQueue}
        peopleInQueue={peopleInQueue}
      />
    </div>
  );
}

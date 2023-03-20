import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import AvgWaitingTime from "./AvgWaitingTime";
import PeopleInQueue from "./PeopleInQueue";
import { auth } from "../data/auth";
import { onAuthStateChanged } from "@firebase/auth";
import { fetchData } from "../data/data";
import { getDataFromRealtimeDB } from "../data/dataFromRealtimeDB";
import { getNameFromUID } from "../data/findNameFromUID";
import { useSelector } from "react-redux";
import { RootState } from "../utils/store";
import { domainName } from "../utils/constants";

export default function Dashboard() {
  const navigate = useNavigate();
  const [dataFromAPI, setDataFromAPI] = useState<object[]>([]);
  const [peopleInQueue, setPeopleInQueue]: object[] = useOutletContext();

  getNameFromUID(domainName);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("user is logged in");
      if (user == null) {
        navigate("/");
      }
    });
  }, []);

  useEffect(() => {
    // fetchData(setDataFromAPI);
    // getNameFromUID("Super Market");
    getDataFromRealtimeDB(setDataFromAPI);
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

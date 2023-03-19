import React, { useEffect, useState } from "react";
import Heading from "./Heading";
import InputField from "./InputField";
import { handleChange } from "../utils/helper";
import { findValidUser } from "../utils/helper";
import { addUserToQueue } from "../utils/helper";
import { handleKeyDown } from "../utils/helper";
import { isUserAlreadyInQueue } from "../utils/helper";
import { useSelector } from "react-redux";
import { RootState } from "../utils/store";

export default function AvgWaitingTime({
  dataFromAPI,
  setPeopleInQueue,
  peopleInQueue,
}) {
  const [QID, setQID] = useState({
    qidValue: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const domainName = useSelector((state: RootState) => state.app.domainName);

  return (
    <div className="grid grid-cols justify-center max-h-72 ">
      <div className="flex flex-col justify-center">
        <Heading heading="Average Waiting Time" />
        <h2 className="text-2xl text-center text-gray-600">10 mins / person</h2>
      </div>

      <form className="pt-12 " onKeyDown={handleKeyDown}>
        <InputField
          label="QID of the User *"
          input="QID"
          value={QID.qidValue}
          name="qidValue"
          onChange={() => handleChange(setQID)}
          type="text"
          minLength=""
          autoComplete=""
        />

        <p className="text-red-600 p-3 font-semibold">{errorMsg}</p>

        {/* <h2 className=" p-10 text-lg font-semibold text-center">Or</h2>

        <ButtonCTA text="Scan QR" /> */}
      </form>

      <button
        onClick={() => {
          const validUser = findValidUser(dataFromAPI, QID, setErrorMsg);
          if (
            !isUserAlreadyInQueue(setErrorMsg, validUser, peopleInQueue) &&
            QID.qidValue.slice(-3) === domainName
          ) {
            addUserToQueue(setErrorMsg, setPeopleInQueue, validUser);
          } else {
            setErrorMsg("Enter valid QID");
          }
        }}
        className="px-48 py-5 rounded-md text-white font-semibold primary-color text-center hover:bg-sky-500 active:bg-sky-600"
      >
        Add User
      </button>
    </div>
  );
}

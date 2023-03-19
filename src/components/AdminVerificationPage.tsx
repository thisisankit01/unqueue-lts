import React from "react";
import Heading from "./Heading";
import email from "../images/email.svg";

export default function AdminVerification() {
  return (
    <div className="grid place-items-center py-12 bg-sky-500">
      <div className="grid grid-col place-items-center text-center rounded-2xl shadow-xl w-8/12 p-10 pt-20 bg-white">
        <Heading heading="Verify your email" />
        <p className="text-xl">
          Your need to verify your email to complete registration
        </p>

        <img className="items-center" src={email} alt="" />

        <p className="text-center leading-6">
          An email has been sent to your email with a link to verify your
          account. If you have have not recieved the email after a few minutes,
          please check your spam folder.
        </p>
      </div>
    </div>
  );
}

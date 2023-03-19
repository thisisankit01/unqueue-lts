import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonCTA from "./ButtonCTA";
import Heading from "./Heading";
import InputField from "./InputField";
import { handleChange } from "../utils/helper";
import { signUpUserWithEmailPass } from "../data/auth";

import { addUserToFirestore } from "../data/data";

export default function AdminRegistration() {
  const [adminForm, setAdminForm] = useState({
    orgName: "",
    email: "",
    password: "",
    ConfirmPassword: "",
  });
  // const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center p-10">
      <Heading heading="Admin Registration" />
      <form
        className="flex flex-col space-y-4 py-10"
        method="POST"
        action=""
        onSubmit={() => {
          if (adminForm.password === adminForm.ConfirmPassword) {
            signUpUserWithEmailPass(adminForm.email, adminForm.password);

            //send admin data to db
            // addUserToFirestore();

            navigate("/login");
          } else {
            // Show an error message or alert to the user
            alert("Password and Confirm Password must be same.");
          }
        }}
      >
        <InputField
          label="Organisation Name *"
          input="Full Name (as regd) *"
          value={adminForm.orgName}
          onChange={() => handleChange(setAdminForm)}
          name="orgName"
          type="text"
          minLength=""
          autoComplete="organisation-name"
        />

        <InputField
          label="Email ID (for verification) *"
          input="xyz@abc.com"
          value={adminForm.email}
          onChange={() => handleChange(setAdminForm)}
          name="email"
          type="email"
          minLength=""
          autoComplete="email-id"
        />
        {/* <div className="flex "> */}
        <InputField
          label="Password *"
          input="********"
          value={adminForm.password}
          onChange={() => handleChange(setAdminForm)}
          name="password"
          type="password"
          minLength="8"
          autoComplete="new-password"
          // type={showPassword ? "text" : "password"}
        />
        {/* <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-sm"
          >
            {showPassword ? "Hide" : "Show"}
          </button> */}
        {/* </div> */}

        <InputField
          label="Confirm Password *"
          input="********"
          value={adminForm.ConfirmPassword}
          onChange={() => handleChange(setAdminForm)}
          name="ConfirmPassword"
          type="password"
          minLength="8"
          autoComplete="confirm-password"
        />
        <ButtonCTA text="Register" />
      </form>
      <h1 className="pb-8 font-semibold text-3xl text-gray-500">or</h1>

      <a>
        <button
          onClick={() => navigate("/login")}
          className="px-48 py-5 rounded-md text-white font-semibold primary-color text-center hover:bg-sky-500 active:bg-sky-600"
        >
          Login
        </button>
      </a>
    </div>
  );
}

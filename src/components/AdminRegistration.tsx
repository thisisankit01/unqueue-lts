import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonCTA from "./ButtonCTA";
import Heading from "./Heading";
import InputField from "./InputField";
import { handleChange } from "../utils/helper";
import { signUpUserWithEmailPass } from "../data/auth";
import { writeAdminData } from "../data/sendDataAdmin";
import { useSelector } from "react-redux";
import { RootState } from "../utils/store";

export default function AdminRegistration() {
  const [adminForm, setAdminForm] = useState({
    orgName: "",
    email: "",
    password: "",
    ConfirmPassword: "",
  });
  const navigate = useNavigate();
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [address, setAddress] = useState("");
  const domainName = useSelector((state: RootState) => state.app.domainName);

  navigator.geolocation.getCurrentPosition((position) => {
    setLat(position.coords.latitude);
    setLon(position.coords.longitude);
  });

  useEffect(() => {
    console.log("useEffect");
    cityName();
    console.log(address);
  }, [adminForm]);

  function cityName() {
    if (lat && lon) {
      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
      )
        .then((response) => response.json())
        .then((data) => {
          const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.hamlet;
          setAddress(address);
          return console.log(address);
        })
        .catch((error) => console.log(error));
    }
  }

  return (
    <div className="flex flex-col items-center p-10">
      <Heading heading="Admin Registration" />
      <form
        className="flex flex-col space-y-4 py-10"
        method="POST"
        action=""
        onSubmit={() => {
          if (adminForm.password === adminForm.ConfirmPassword) {
            // writeUserData();
            writeAdminData(adminForm.orgName, address, domainName);
            signUpUserWithEmailPass(adminForm.email, adminForm.password);
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

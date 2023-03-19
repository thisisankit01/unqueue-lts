import React from "react";
import Logo from "../images/logo unqueue.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logOut } from "../data/auth";
import { useDispatch } from "react-redux";
import { removeDomainName } from "../utils/domainSlice";

export default function Navbar({ peopleInQueue }) {
  const currentRoute = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function removeDomainNameFromStore() {
    dispatch(removeDomainName());
  }
  return (
    <nav className="flex justify-between p-3 border border-b-gray-200">
      <Link to="/domains" className="flex">
        <img src={Logo} className="w-10" />
        <h1 className="font-semibold text-3xl px-3 text-gray-600">UnQueue</h1>
      </Link>

      {currentRoute.pathname === "/dashboard" && (
        <a
          onClick={async () => {
            removeDomainNameFromStore();
            const isLoggedOut = logOut();
            if (isLoggedOut) {
              navigate("/login");
            }
          }}
          className="text-xl font-normal cursor-pointer hover:font-medium"
        >
          Logout
        </a>
      )}
    </nav>
  );
}

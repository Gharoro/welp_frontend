import React from "react";
import { useNavigate } from "react-router-dom";
import isLoggedIn from "../../../utils/isLoggedIn";

export default function Hero() {
  const navigate = useNavigate();

  const handleNav = () => {
    if (isLoggedIn()) {
      navigate("/admin");
    } else {
      navigate("/login");
    }
  };
  return (
    <div class="bg-light p-5 rounded mb-8">
      <h1>Welcome to Welp - A Yelp Clone</h1>
      <p class="lead">
        Find businessess around you or take your business online. Leave reviews
        and comments on businessess you've experienced.
      </p>
      <a class="btn btn-lg btn-primary" role="button" onClick={handleNav}>
        Add Listing &#43;
      </a>
    </div>
  );
}

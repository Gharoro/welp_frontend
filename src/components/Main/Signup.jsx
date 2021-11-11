import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Login.css";
import { alertSuccess, alertError } from "../../utils/alerts";
import isLoggedIn from "../../utils/isLoggedIn";
import { userSignup } from "../../utils/apiMethods";

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    isLoggedIn() && navigate("/admin");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: e.target.full_name.value,
      phone_number: e.target.phone.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    if (data.password.length < 6) {
      alertError("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    userSignup(data)
      .then((res) => {
        alertSuccess(res.data.message);
        setLoading(false);
        navigate("/login");
      })
      .catch((error) => {
        alertError(error.response.data.error);
        setLoading(false);
      });
  };
  return (
    <div className="text-center container main-form">
      <main className="form-signin">
        <form onSubmit={handleSubmit}>
        <h3>Welcome</h3>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              name="full_name"
              placeholder="Enter your full name"
            />
            <label for="floatingInput">Full Name</label>
          </div>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="johndoe@example.com"
              name="email"
            />
            <label for="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Enter your phone number"
              name="phone"
            />
            <label for="floatingInput">Phone</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              name="password"
            />
            <label for="floatingPassword">Password</label>
          </div>

          <button disabled={loading ? true : false} className="w-100 btn btn-lg btn-primary" type="submit">
            Signup
          </button>
          <p className="mt-5 mb-3 ">
            Already have an account? Please <a href="/login">Login</a>
          </p>
        </form>
      </main>
    </div>
  );
}
